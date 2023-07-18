import React, { useState, useContext } from "react";
import { GlobalContext } from "../../App";
import { Modal } from "../Helpers/Modal";
export const Withdraw = () => {
  const { balance, pendingTransfer } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const [withdrawalPopup, setWithdrawalPopup] = useState(true);

  const handleChange = (event) => {
    const value = Math.max(0, Math.min(balance, Number(event.target.value)));
    setValue(value);
  };
  return (
    <div className="w-full">
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

      <div class="w-3/5 mt-2 m-auto">
        <form
          class={`bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
            pendingTransfer && "opacity-40 cursor-not-allowed"
          }`}
        >
          <h2 className="bg-green-100 dark:bg-gray-900 p-2 text-green-600 rounded mb-2 w-2/4 text-center font-bold">
            Account: $ {balance.toLocaleString()}
          </h2>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Wallet Address
            </label>
            <input
              disabled={pendingTransfer}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:border-none dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Wallet Address"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Amount
            </label>
            <input
              value={value}
              disabled={pendingTransfer}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:border-none dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              onChange={handleChange}
              placeholder="Amount"
              max="25"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Security key
            </label>
            <input
              disabled={pendingTransfer}
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:border-none dark:bg-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              disabled={pendingTransfer}
              class="bg-blue-500 hover:bg-blue-700 dark:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Confirm Withdrawal
            </button>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2023 SafeCoin. All rights reserved.
        </p>
      </div>
      {withdrawalPopup && <Modal setPopup={setWithdrawalPopup} />}
    </div>
  );
};
