import React, { useState, useContext, useEffect } from "react";
import { InsideNav } from "../Main/InsideNav";
import AppSettings from "../../app.settings.json";
import axios from "axios";
import { GlobalContext } from "../../App";
import toast from "react-hot-toast";

export const Transfer = () => {
  const { pendingTransfer, prices, balance, setBalance } =
    useContext(GlobalContext);
  let info = JSON.parse(localStorage.getItem("usr_info"));
  const [transferInfo, setTransferInfo] = useState({
    sender: info.username,
    receiver: "",
    amount: "",
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

      <div className="flex  flex-col space-y-4">
        <form
          className={`w-3/5 mt-4 flex-1 border border-gray-100 dark:border-none p-6 rounded shadow-md dark:bg-gray-600 ${
            pendingTransfer && "opacity-40"
          }`}
          onSubmit={createTransfer}
        >
          <div
            class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">
                You can only transfer to other users of the site!
              </span>
            </div>
          </div>
          <div
            class="p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span class="font-base"> Balance:</span> ${""}
            {balance.toLocaleString()}
            {""}
            <b className="ml-1">
              {`( ₿ ${(balance / prices.btc).toFixed(to_fixed)})`}{" "}
            </b>
          </div>

          {balance === 0 && (
            <div
              class="p-4 mb-4 text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <b className="ml-2">
                You can't transfer because your balance is zero ☹️
              </b>
            </div>
          )}

          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              class={`${
                isUserNotFound && "border border-red-500"
              } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              required
              placeholder="Enter username"
            />
            {isUserNotFound && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Oops!</span> User not found
              </p>
            )}
          </div>
          <div class="mb-6">
            <label
              for="amount"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Transfer Amount
            </label>
            <input
              disabled={pendingTransfer}
              value={transferInfo.amount}
              onChange={(e) => {
                const balance_amount = Math.max(
                  1,
                  Math.min(balance, Number(e.target.value))
                );
                setTransferInfo({ ...transferInfo, amount: balance_amount });
              }}
              max={balance}
              type="number"
              id="amount"
              class={` shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              required
              placeholder="$1,000  Maximum Per Transfer"
            />
          </div>

          <button
            disabled={loader || pendingTransfer || balance === 0}
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loader ? (
              <span>
                {" "}
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline mr-2 w-5 h-5  text-gray-200 animate-spin dark:text-gray-600"
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

        <div className="">
          <div class="flex-1  relative shadow-md sm:rounded-lg dark:bg-gray-800 dark:text-white">
            <h2 className="text-2xl border dark:border-none  rounded p-2 mb-2">
              Recent Transfer
            </h2>
            <table class="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:bg-gray-800">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    To user
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {transfer.receiver}
                    </th>
                    <td class="px-6 py-4">{transfer.amount}$</td>
                    <td class="px-6 py-4">{transfer.status}</td>
                    <td class="px-6 py-4">{transfer.datetime}</td>
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
