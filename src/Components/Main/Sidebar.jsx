import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { GiWallet } from "react-icons/gi";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaHandshake } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineCalculator } from "react-icons/hi";
export const Sidebar = (props) => {
  const navigate = useNavigate();
  const { showSidebar, setShowSidebar } = props;
  return (
    <aside
      onClick={() => setShowSidebar(!showSidebar)}
      className={`block h-screen sticky ${
        showSidebar ? "" : "sm:hidden"
      }  sm:fixed bottom-0 top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0 sm:w-full sm:bg-themask`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 w-64 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li onClick={() => navigate("/home")} className="cursor-pointer">
            <span
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HomeIcon className="text-gray-500 h-5 w-5" />
              <span class="ml-3">Home</span>
            </span>
          </li>
          <li
            onClick={() => navigate("/home/withdraw")}
            className="cursor-pointer"
          >
            <span
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {/* <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg> */}
              <GiWallet className="text-gray-500 h-5 w-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Withdraw</span>
            </span>
          </li>
          <li
            onClick={() => navigate("/home/transfer")}
            className="cursor-pointer"
          >
            <span
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiOutlineTransaction className="text-gray-500 h-5 w-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Transfer</span>
            </span>
          </li>

          <li
            onClick={() => navigate("/home/invest")}
            className="cursor-pointer"
          >
            <span
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <GiReceiveMoney className="text-gray-500 h-5 w-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Invest</span>
            </span>
          </li>
          <li
            onClick={() => navigate("/home/about")}
            className="cursor-pointer"
          >
            <span
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BsInfoCircle className="text-gray-500 h-5 w-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">About</span>
            </span>
          </li>
          <li
            onClick={() => navigate("/home/calculator")}
            className="cursor-pointer"
          >
            <span
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HiOutlineCalculator className="text-gray-500 h-5 w-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Calculator</span>
            </span>
          </li>

          <li
            onClick={() => navigate("/home/partners")}
            className="cursor-pointer"
          >
            <span class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaHandshake className="text-gray-500 h-5 w-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Partners</span>
            </span>
          </li>
          <li
            onClick={() => navigate("/home/contact_us")}
            className="cursor-pointer"
          >
            <span class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiPhoneCall className="text-gray-500 h-5 w-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Contact</span>
            </span>
          </li>
          <li
            onClick={() => {
              localStorage.clear();
              navigate("/login");
              window.location.reload();
            }}
            className="cursor-pointer"
          >
            <span class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
};
