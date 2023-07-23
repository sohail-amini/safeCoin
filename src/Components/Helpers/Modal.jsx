import React, { useContext } from "react";
import { GlobalContext } from "../../App";
export const Modal = ({ setPopup, popupData }) => {
  const { balance } = useContext(GlobalContext);

  console.log("Balance:", balance);
  console.log("popup data:", popupData);
  console.log("status :", popupData.status);
  console.log("error code :", popupData.status_code);
  console.log(
    "status:",
    popupData.status === "failed" && popupData.error_code === "max_amount"
  );

  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed flex items-center top-0 left-0 right-0 z-50 bg-themask w-full  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full m-auto">
        <div class="transition transition-all duration-300 relative bg-white w-2/3	m-auto rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {popupData.status === "success"
                ? "Withdrawal was successful ✅"
                : "Withdrawal was failed ❌"}
            </h3>
            <button
              onClick={() => setPopup({ show: false })}
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <svg
                class="w-3 h-3"
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
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div class="p-6 space-y-6">
            <p class="text-md leading-relaxed text-gray-500 dark:text-gray-400">
              {popupData.status === "success"
                ? "Your withdrawal request has been received, please check you email in approx 30 mins for a confirmation email that your funds havebeen sent."
                : popupData.status === "failed" &&
                  popupData.status_code === "max_amount"
                ? `Maximuim withdraw for you account is ${balance}`
                : "Sorry your 5-digit PIN is incorrect. Please try again. This is the PIN you created during registration."}
            </p>
          </div>

          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="defaultModal"
              type="button"
              onClick={() => setPopup({ show: false })}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
