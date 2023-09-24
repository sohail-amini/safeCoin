import React, { useContext } from "react";
import { GlobalContext } from "../../App";
export const Modal = ({ setPopup, popupData }) => {
  const { balance } = useContext(GlobalContext);

  const getMessage = () => {
    if (popupData.status === "success") {
      return "Your withdrawal request has been received, please check you email in approx 30 mins for a confirmation email that your funds havebeen sent.";
    } else if (
      popupData.status === "failed" &&
      popupData.status_code === "max_amount"
    )
      return `Maximuim withdraw for you account is ${balance}`;
    else if (
      popupData.status === "failed" &&
      popupData.status_code === "wrong_pin"
    )
      return "Wrong 5-digit PIN code";
    else if (
      popupData.status === "failed" &&
      popupData.status_code === "max_amount_reached"
    ) {
      return "Free trial accounts can't withdraw more than $25 per month";
    } else if (
      popupData.status === "failed" &&
      popupData.status_code === "wrong_amount"
    ) {
      return "Invalid input";
    } else
      return "Sorry your 5-digit PIN is incorrect. Please try again. This is the PIN you created during registration";
  };
  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      className="fixed flex items-center top-0 left-0 right-0 z-50 bg-themask w-full  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full m-auto">
        <div className="transition transition-all duration-300 relative bg-white w-2/3 sm:w-4/5	m-auto rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {popupData.status === "success"
                ? "Withdrawal was successful ✅"
                : "Withdrawal has failed ❌"}
            </h3>
            <button
              onClick={() => setPopup({ show: false })}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-md leading-relaxed text-gray-500 dark:text-slate-200">
              {getMessage()}
            </p>
          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="defaultModal"
              type="button"
              onClick={() => setPopup({ show: false })}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
