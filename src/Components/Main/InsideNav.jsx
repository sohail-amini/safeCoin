import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
export const InsideNav = ({ name }) => {
  const { prices, pendingTransfer } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col space-y-2" aria-label="Breadcrumb">
      <div className="block grid grid-cols-4 gap-y-2 md:m-auto sm:w-full md:mb-4 text-center sm:grid-cols-1 sm:space-y-2">
        {prices.length > 0 &&
          prices.map((coin, index) => {
            // Define an array of CSS classes for background and text colors
            const bgColors = [
              "bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
              "bg-green-100 dark:bg-green-700 dark:text-green-300",
              "bg-red-100",
              "bg-yellow-100",
              "bg-lime-100",
              "bg-purple-100 dark:bg-purple-500",
            ];
            const textColors = [
              "text-blue-800",
              "text-green-800",
              "text-red-800 dark:bg-red-300",
              "text-yellow-800",
              "text-lime-800 dark:bg-lime-600 dark:text-lime-100",
              "text-purple-800 dark:bg-purple-600 dark:text-purple-50",
            ];

            // Get the index modulo the length of the color arrays to cycle through colors
            const bgColorClass = bgColors[index % bgColors.length];
            const textColorClass = textColors[index % textColors.length];

            return (
              <span
                key={index} // Don't forget to provide a unique key when mapping
                className={`py-4 px-2 text-base ${bgColorClass} ${textColorClass} font-medium mr-2 rounded`}
              >
                {coin.code}{" "}
                {coin.rate.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            );
          })}
      </div>
      {pendingTransfer &&
        location.pathname !== "/home" &&
        location.pathname !== "/home/invest" && (
          <div
            className="flex justify-between items-center mt-4 p-4 mb-4 text-base text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            <span className="font-medium">
              Warning! You're using the free-tier package. Upgrade to unlock
              full withdrawal features.
            </span>{" "}
            <button
              className="font-bold bg-blue-600 p-1.5 px-4 rounded ml-2 text-white"
              onClick={() => navigate("/home/invest")}
            >
              Upgrade ✨
            </button>
          </div>
        )}
    </nav>
  );
};
