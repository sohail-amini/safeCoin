import React, { useState, useContext, useEffect } from "react";
import { InsideNav } from "../Main/InsideNav";
import AppSettings from "../../app.settings.json";
import axios from "axios";
import { GlobalContext } from "../../App";
import toast from "react-hot-toast";

export const Transfer = () => {
  const { pendingTransfer, btcRate, balance, setBalance } =
    useContext(GlobalContext);
  let info = JSON.parse(localStorage.getItem("usr_info"));
  const [transferInfo, setTransferInfo] = useState({
    sender: info.username,
    receiver: "",
    amount: null,
    status: "pending",
  });
  const [isUserNotFound, setUserNotFound] = useState(false);
  const [loader, setLoader] = useState(false);

  const [transfers, setTransfers] = useState([]);

  let to_fixed = balance.toString().length > 6 ? 4 : 6;
  if (balance === 0) to_fixed = 0;

  const fetch_all_transfer = async () => {
    await fetch(`${AppSettings.APIserver}/fetch_all_transfer/${info.username}`)
      .then((res) => res.json())
      .then((data) => {
        setTransfers(data.transfers);
      });
  };

  const transfers_for_admin = async () => {
    if (info.username === "admin")
      await fetch(
        `${AppSettings.APIserver}/all_transfers_admin/${info.username}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTransfers(data.transfers);
        });
  };

  useEffect(() => {
    const check_balance = async () => {
      await fetch(`${AppSettings.APIserver}/check_balance/${info.id}`)
        .then((res) => res.json())
        .then((res) => {
          setBalance(res.balance);
        });
    };
    check_balance();

    fetch_all_transfer();
    transfers_for_admin();
  }, []);

  const showToast = (message) => {
    toast((t) => (
      <span className="flex flex-row items-center">
        <span className="font-500">{message}</span>
        <button
          className="bg-gray-100 p-1 border border-gray-200 rounded text-sm"
          onClick={() => toast.dismiss(t.id)}
        >
          Dismiss
        </button>
      </span>
    ));
  };

  const createTransfer = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (transferInfo.amount > 1000) {
      setLoader(false);
      showToast("Maximum amount for each transfer is 1,000$");
    } else {
      if (transferInfo.receiver === transferInfo.sender) {
        setLoader(false);
        showToast("You can only transfer to other users of the site!");
      } else
        await axios
          .post(`${AppSettings.APIserver}/transfer`, {
            ...transferInfo,
            amount: transferInfo.amount / btcRate,
            senderId: info.id,
          })
          .then((res) => {
            console.log("response", res);
            if (res.data.key === "max_transfer_amount")
              toast.error(
                "You reached max transfer amount $5000. and can't transfer more."
              );
            else if (res.data.message === "user_not_found")
              setUserNotFound(true);
            else {
              setBalance(res.data.balance.toFixed(2));
              setTransferInfo({
                ...transferInfo,
                receiver: "",
                amount: "",
              });
              toast.success("Transfered successfully");
              fetch_all_transfer();
            }
            setLoader(false);
          })
          .catch((e) => {
            console.log(e);
            setLoader(false);
            toast.error("Something went wrong");
          });
    }
  };

  return (
    <div className="w-full flex-1">
      <InsideNav name="transfer" />

      <div className="flex flex-col space-y-4">
        <form
          className={`w-3/5 sm:w-full sm:px-3  mt-4 flex-1 border border-gray-100 dark:border-none p-6 rounded shadow-md dark:bg-gray-800 ${
            pendingTransfer && "opacity-40"
          }`}
          onSubmit={createTransfer}
        >
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-900 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">
                You can only transfer to other users of the site!
              </span>
            </div>
          </div>
          <div
            className="p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-900 dark:text-green-400"
            role="alert"
          >
            <span className="font-base"> Balance:</span> ₿{""}
            {balance.toLocaleString()}
            {""}
            <b className="ml-1">{`($${(balance * btcRate).toFixed(2)})`} </b>
          </div>

          {balance === 0 && (
            <div
              className="p-4 mb-4 text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <b className="ml-2">
                You can't transfer because your balance is zero ☹️
              </b>
            </div>
          )}

          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Receiver username
            </label>
            <input
              disabled={pendingTransfer}
              value={transferInfo.receiver}
              onChange={(e) => {
                setUserNotFound(false);
                setTransferInfo({ ...transferInfo, receiver: e.target.value });
              }}
              type="text"
              id="password"
              className={`${
                isUserNotFound && "border border-red-500"
              } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              required
              placeholder="Enter username"
            />
            {isUserNotFound && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> User not found
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Transfer Amount
            </label>
            <input
              disabled={pendingTransfer}
              value={transferInfo.amount}
              onChange={(e) => {
                setTransferInfo({ ...transferInfo, amount: e.target.value });
              }}
              max={1000}
              type="number"
              id="amount"
              className={` shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              required
              placeholder="$1,000  Maximum Per Transfer"
            />
          </div>

          <button
            disabled={loader || pendingTransfer || balance === 0}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loader ? (
              <span>
                {" "}
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 w-5 h-5  text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Transfering...
              </span>
            ) : (
              <span>Complete Transfer</span>
            )}
          </button>
        </form>

        <div>
          <div className="flex-1 relative shadow-md sm:rounded-lg dark:bg-gray-800 dark:text-white sm:w-full">
            <h2
              className="text-2xl border dark:border-none p-4 mb-2 dark:border-b-1 dark:border-slate-100"
              style={{ borderBottom: "1px solid #eee" }}
            >
              Recent Transfer
            </h2>
            <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-slate-200 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 sm:px-1">
                    To user
                  </th>
                  <th scope="col" className="px-6 py-3 sm:px-1">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 sm:px-1">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 sm:px-1">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 dark:text-slate-200">
                    <th
                      scope="row"
                      className="px-6 py-4 sm:px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {transfer.receiver}
                    </th>
                    <td className="px-6 py-4 sm:px-1">
                      ${(transfer.amount * btcRate).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 sm:px-1">
                      {info.username === "admin" ? "Success" : transfer.status}
                    </td>
                    <td className="px-6 py-4 sm:px-1">{transfer.datetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
