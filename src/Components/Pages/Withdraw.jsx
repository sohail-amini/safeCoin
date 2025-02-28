import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../App";
import { Modal } from "../Helpers/Modal";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppSettings from "../../app.settings.json";

export const Withdraw = () => {
  const { balance, btcRate, pendingTransfer } = useContext(GlobalContext);

  const navigate = useNavigate();
  let info = JSON.parse(localStorage.getItem("usr_info"));

  const [values, setValues] = useState({
    wallet_address: "",
    amount: null,
    secret_key: "",
    sender: info.username,
  });
  const [withdrawalPopup, setWithdrawalPopup] = useState({
    show: false,
    status: "error",
    error_code: "",
  });
  const [loader, setLoader] = useState(false);
  const [withdraws, setWithdraws] = useState([]);

  let to_fixed = 2;
  if (balance === 0) to_fixed = 0;

  const fetchWithdraws = async () => {
    try {
      await axios(
        `${AppSettings.APIserver}/total_withdraw/${info.username}`
      ).then((res) => setWithdraws(res.data.withdraws));
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  useEffect(() => {
    fetchWithdraws();
  }, [withdrawalPopup]);

  function checkNumber(input) {
    if (typeof input === "number") {
      return input < 0;
    } else if (typeof input === "string") {
      // Remove whitespace and trim the string
      const cleanedInput = input.trim().replace(/\s+/g, "");

      // Check if it contains a positive or negative sign
      if (cleanedInput.includes("+") || cleanedInput.includes("-")) {
        return true;
      }

      // Try parsing the cleaned input as a number and check if it's less than zero
      const parsedNumber = parseFloat(cleanedInput);
      return !isNaN(parsedNumber) && parsedNumber < 0;
    }

    // If the input is not a number or string, return false
    return false;
  }

  const confirmWithdraw = async () => {
    const { amount } = values;
    let converted = +(amount / btcRate);

    setLoader(true);

    setTimeout(() => {
      setLoader(false);
      setWithdrawalPopup({
        show: true,
        status: "failed",
        status_code: "not_subscribed",
      });
    }, 3000);
    // if (true) {

    // }

    // if (checkNumber(amount)) {
    //   setWithdrawalPopup({
    //     show: true,
    //     status: "failed",
    //     status_code: "wrong_amount",
    //   });
    // }
    // if (info.username === "admin") {
    //   setTimeout(() => {
    //     setWithdrawalPopup({
    //       show: true,
    //       status: "failed",
    //     });
    //     setLoader(false);
    //   }, 3000);
    // } else if (info.username !== "admin" && converted > balance) {
    //   setTimeout(() => {
    //     setWithdrawalPopup({
    //       show: true,
    //       status: "failed",
    //       status_code: "max_amount",
    //     });
    //     setLoader(false);
    //   }, 3000);
    // } else {
    //   await axios
    //     .post(`${AppSettings.APIserver}/create_withdraw`, {
    //       ...values,
    //       sender: info.username,
    //       email: info.email,
    //       amount: converted,
    //     })
    //     .then((res) => {
    //       if (res.data.message === "wrong_pin") {
    //         setWithdrawalPopup({
    //           show: true,
    //           status: "failed",
    //           status_code: "wrong_pin",
    //         });
    //         setLoader(false);
    //       } else if (res.data.key === "max_amount") {
    //         setWithdrawalPopup({
    //           show: true,
    //           status: "failed",
    //           status_code: "max_amount_reached",
    //         });
    //         setLoader(false);
    //       } else {
    //         setTimeout(() => {
    //           setWithdrawalPopup({
    //             show: true,
    //             status: "success",
    //           });
    //           setValues({
    //             wallet_address: "",
    //             amount: null,
    //             secret_key: "",
    //           });
    //           setLoader(false);
    //           setBalance(res.data.balance);
    //         }, 2000);
    //       }
    //     })
    //     .catch((e) => {
    //       setLoader(false);
    //       setValues({
    //         wallet_address: "",
    //         amount: null,
    //         secret_key: "",
    //       });
    //     });
    // }
  };

  function show12Characters(inputString) {
    if (inputString.length > 12) {
      return inputString.slice(0, 12) + "...";
    }
    return inputString;
  }

  return (
    <div className="w-full ">
      <div className="mt-2 ">
        <form
          className={`bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/5 sm:w-full sm:px-4 sm:px-4`}
        >
          <h1 className="text-2xl mb-4 font-bold leading-12 text-gray-600 dark:text-gray-100">
            New withdrawal
          </h1>
          {pendingTransfer && (
            <div
              className="w-4/5 mt-4 p-2 px-4 flex flex-row justify-between items-center mb-4 text-base rounded-lg  dark:bg-gray-700 dark:text-slate-100"
              role="alert"
            >
              <span className="font-medium w-4/5">
                Warning! You're using the free-tier package. Upgrade to unlock
                full withdrawal features.
              </span>
              <button
                className="font-bold bg-blue-600 p-2 px-4 block rounded ml-2 text-white"
                onClick={() => navigate("/home/invest")}
              >
                Upgrade ✨
              </button>
            </div>
          )}
          <h2 className="bg-green-100 dark:bg-green-300 p-2 text-green-900 rounded mb-2 w-2/4 sm:w-full text-center font-bold">
            Balance: ₿{balance.toLocaleString()}{" "}
            {`($${(balance * btcRate).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })})`}
          </h2>
          {balance === 0 && (
            <div
              className="p-4 mb-4 text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <b className="ml-2">
                You can't withdraw because your balance is zero ☹️
              </b>
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
              for="username"
            >
              USDT Address
            </label>
            <input
              color="gray"
              value={values.wallet_address}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:border-none dark:text-slate-100 dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="wallet_address"
              onChange={(e) =>
                setValues({ ...values, wallet_address: e.target.value })
              }
              placeholder=""
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
              for="username"
            >
              Amount
            </label>
            <input
              value={values.amount !== null && values.amount}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-slate-100 dark:border-none dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              name="amount"
              min="1"
              max={balance * btcRate}
              onChange={(e) => {
                setValues({ ...values, amount: e.target.value });
              }}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
              for="password"
            >
              5-digit PIN code
            </label>
            <input
              value={values.secret_key}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-slate-100 dark:border-none dark:bg-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="secret_key"
              onChange={(e) =>
                setValues({ ...values, secret_key: e.target.value })
              }
              placeholder=""
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={
                loader ||
                values?.wallet_address === "" ||
                values?.amount === null ||
                balance === 0
              }
              className="bg-blue-500 block w-48 hover:bg-blue-700 dark:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={confirmWithdraw}
            >
              {loader ? (
                <Spinner
                  aria-label="Default status example"
                  className="dark:text-slate-100"
                />
              ) : (
                "Confirm Withdrawal"
              )}
            </button>
          </div>
        </form>
        <div className="w-full p-4  rounded bg-slate-100 dark:bg-gray-800 dark:text-gray-300">
          <h2 className="text-2xl mb-4 text-center ">Withdrawal history</h2>
          {withdraws.length > 0 ? (
            <table className="table-fixed w-full border-separate-4 ">
              <thead>
                <tr className="grid grid-cols-4 sm:flex sm:flex-row sm:space-x-2 items-center">
                  <th>Wallet Address</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="w-full text-center">
                {withdraws.map((withdraw) => (
                  <tr className="grid grid-cols-4  mt-2 sm:text-md sm:flex sm:flex-row sm:space-x-2 items-start">
                    <td>{show12Characters(withdraw.wallet_address)}</td>
                    <td>${withdraw.amount.toLocaleString()}</td>
                    <td>{withdraw.status}</td>
                    <td>{withdraw.datetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="text-center text-2xl text-gray-400">
              No withdrawal found
            </h2>
          )}
        </div>

        <div className="mt-6 block ">
          <p className="text-center text-gray-500 text-base dark:text-gray-200 ">
            &copy;2023 SafeCoin. All rights reserved.
          </p>
        </div>
      </div>
      {withdrawalPopup.show && (
        <Modal setPopup={setWithdrawalPopup} popupData={withdrawalPopup} />
      )}
    </div>
  );
};
