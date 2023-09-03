import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../App";
import { Modal } from "../Helpers/Modal";
import { Spinner } from "flowbite-react";
import axios from "axios";
import AppSettings from "../../app.settings.json";

export const Withdraw = () => {
  const { balance, prices, setBalance } = useContext(GlobalContext);

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

  let to_fixed = balance.toString().length > 6 ? 4 : 6;
  if (balance === 0) to_fixed = 0;

  const fetchWithdraws = async () => {
    try {
      // Your async logic here
      const result = await axios(
        `${AppSettings.APIserver}/total_withdraw/${info.username}`
      ).then((res) => setWithdraws(res.data.withdraws));
      // Do something with the result
      console.log(result);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  useEffect(() => {
    fetchWithdraws();
  }, [withdrawalPopup]);
  // const handleChange = (event) => {
  //   const balance_amount = Math.max(
  //     0,
  //     Math.min(balance, Number(event.target.value))
  //   );
  //   let key = event.target.name;
  //   setValues({
  //     [key]: key === "amount" ? balance_amount : event.target.value,
  //   });
  //   // console.log(event.target.name);
  // };

  const confirmWithdraw = async () => {
    setLoader(true);
    console.log(info.username);
    if (info.username === "admin") {
      setTimeout(() => {
        setWithdrawalPopup({
          show: true,
          status: "failed",
        });
        setLoader(false);
      }, 3000);
    } else if (info.username !== "admin" && values.amount > balance) {
      setTimeout(() => {
        setWithdrawalPopup({
          show: true,
          status: "failed",
          status_code: "max_amount",
        });
        setLoader(false);
      }, 3000);
    } else {
      await axios
        .post(`${AppSettings.APIserver}/create_withdraw`, {
          ...values,
          sender: info.username,
        })
        .then((res) => {
          console.log(res);
          if (res.data.message === "wrong_pin") {
            setWithdrawalPopup({
              show: true,
              status: "failed",
              status_code: "wrong_pin",
            });
            setLoader(false);
          } else if (res.data.key === "max_amount") {
            setWithdrawalPopup({
              show: true,
              status: "failed",
              status_code: "max_amount_reached",
            });
            setLoader(false);
          } else {
            setTimeout(() => {
              setWithdrawalPopup({
                show: true,
                status: "success",
              });
              setValues({
                wallet_address: "",
                amount: null,
                secret_key: "",
              });
              setLoader(false);
              setBalance(res.data.balance);
            }, 2000);
          }
        })
        .catch((e) => {
          setLoader(false);
          setValues({
            wallet_address: "",
            amount: null,
            secret_key: "",
          });
        });
    }
  };

  function show12Characters(inputString) {
    if (inputString.length > 12) {
      return inputString.slice(0, 12) + "...";
    }
    return inputString;
  }

  return (
    <div className="w-full ">
      {/*
        <div
          id="alert-additional-content-2"
          class="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <div class="flex items-center">
            <svg
              class="flex-shrink-0 w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <h3 class="text-lg font-medium">Withdrawal disabled</h3>
          </div>
          <div class="mt-2 mb-4 text-md">
            Withdrawal to your registered ฿itcoin wallet address has been
            disabled . To reactivate withdrawal you need to contact customer
            care and provide your secure key you created during account
            registration. You will still be able to carry out transfers and
            transactions from your account balance to other BYBTC VIP members
            without your secure key for the next 6 months.
          </div>
          <div class="flex">
            <button
              type="button"
              class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <svg
                class="-ml-0.5 mr-2 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              Carry out transfer
            </button>
          </div>
        </div>
      */}

      <div class="mt-2 ">
        <form
          class={`bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/5`}
        >
          <h1 className="text-2xl mb-4 font-bold leading-12 text-gray-600 dark:text-gray-100">
            New withdrawal
          </h1>
          <h2 className="bg-green-100 dark:bg-green-300 p-2 text-green-900 rounded mb-2 w-2/4 text-center font-bold">
            Balance: ${balance.toLocaleString()}{" "}
            {`(₿ ${(balance / prices.btc).toFixed(to_fixed)})`}
          </h2>
          {balance === 0 && (
            <div
              class="p-4 mb-4 text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <b className="ml-2">
                You can't withdraw because your balance is zero ☹️
              </b>
            </div>
          )}
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
              for="username"
            >
              Wallet Address
            </label>
            <input
              value={values.wallet_address}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:border-none dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="wallet_address"
              onChange={(e) =>
                setValues({ ...values, wallet_address: e.target.value })
              }
              placeholder=""
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
              for="username"
            >
              Amount
            </label>
            <input
              value={values.amount !== null && values.amount}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:border-none dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              name="amount"
              max={balance}
              onChange={(e) => {
                const balance_amount = Math.max(
                  1,
                  Math.min(balance, Number(e.target.value))
                );
                setValues({ ...values, amount: balance_amount });
              }}
            />
          </div>

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
              for="password"
            >
              5-digit PIN code
            </label>
            <input
              value={values.secret_key}
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:border-none dark:bg-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="secret_key"
              onChange={(e) =>
                setValues({ ...values, secret_key: e.target.value })
              }
              placeholder=""
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              disabled={
                loader ||
                values?.wallet_address === "" ||
                values?.amount === null ||
                balance === 0
              }
              class="bg-blue-500 block w-48 hover:bg-blue-700 dark:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={confirmWithdraw}
            >
              {loader ? (
                <Spinner aria-label="Default status example" />
              ) : (
                "Confirm Withdrawal"
              )}
            </button>
          </div>
        </form>
        <div className="w-full p-4  rounded bg-slate-100 dark:bg-gray-800 dark:text-gray-300">
          <h2 className="text-2xl mb-4 text-center ">Withdraw History</h2>
          {withdraws.length > 0 ? (
            <table class="table-fixed w-full border-separate-4">
              <thead>
                <tr>
                  <th>Wallet Address</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="w-full text-center">
                {withdraws.map((withdraw) => (
                  <tr className="space-y-6 mt-2">
                    <td>{show12Characters(withdraw.wallet_address)}</td>
                    <td>{withdraw.amount.toLocaleString()}</td>
                    <td>{withdraw.status}</td>
                    <td>{withdraw.datetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="text-center text-2xl text-gray-400">
              No Widthdraw found
            </h2>
          )}
        </div>

        <div className="mt-6 block ">
          <p class="text-center text-gray-500 text-base dark:text-gray-200 ">
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
