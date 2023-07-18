import React from "react";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { GiWallet } from "react-icons/gi";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { InsideNav } from "./InsideNav";
import usdt from "../../assets/usdt.png";
import bnb from "../../assets/bnb.png";
import ada from "../../assets/ada.png";

export const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      <InsideNav name="transfer" />
      <div className="mt-2 w-full p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-cyan-100">
            {" "}
            The most trusted & secure crypto wallet
          </h2>
          <p className="mt-2 text-base text-gray-600 dark:text-cyan-200">
            Buy, store, collect NFTs, exchange & earn crypto.
          </p>
        </div>
        <div className="grid grid-cols-4 items-center gap-y-2 md:flex-col md:grid-cols-1 md:gap-y-2 2x:bg-red-500 gap-x-2">
          <span className="bg-blue-100 flex items-center inline text-blue-800 text-xs font-medium p-4 mr-2 rounded dark:bg-blue-900 dark:text-blue-300">
            <BsCurrencyBitcoin className="inline text-xl" />
            <b className="ml-2 text-xl">Bitcoin</b>
          </span>
          <span className="bg-gray-100 flex items-center text-gray-800 text-xs font-medium mr-2 p-4 rounded dark:bg-gray-700 dark:text-gray-300">
            <FaEthereum className="inline text-xl" />
            <b className="ml-2 text-xl">Ethereum</b>
          </span>
          <span className="bg-green-100 text-green-800 flex items-center text-xs font-medium mr-2 p-4 rounded dark:bg-green-900 dark:text-red-300">
            <img src={usdt} className="h-8 w-8" />
            <b className="ml-2 text-xl">USDT</b>
          </span>
          <span className="bg-blue-100 text-blue-800 flex items-center text-xs font-medium mr-2 p-4 rounded dark:bg-blue-900 dark:text-red-300">
            <img src={ada} className="h-8 w-8" />
            <b className="ml-2 text-xl">ADA</b>
          </span>
          <span className="bg-yellow-100 text-yellow-800 flex items-center text-xs font-medium mr-2 p-4 rounded dark:bg-yellow-900 dark:text-red-300">
            <img src={bnb} className="h-8 w-8" />
            <b className="ml-2 text-xl">BNB</b>
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-x-2 md:grid-cols-2 sm:grid-cols-2 gap-y-2">
        <span
          onClick={() => navigate("/home/recharge")}
          className="flex md:flex-col sm:flex-col sm:items-center  items-cener block space-x-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700  "
        >
          <BanknotesIcon className="text-blue-500 h-12 w-12" />
          <h5 className="mb-2 flex items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recharge
          </h5>
          {/* <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
        </span>
        <span
          onClick={() => navigate("/home/withdraw")}
          href="#"
          className="flex md:flex-col sm:flex-col sm:items-center items-cener block space-x-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700  "
        >
          <GiWallet className="dark:text-cyan-100 text-black h-12 w-12" />
          <h5 className="mb-2 flex items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Withdraw
          </h5>
          {/* <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
        </span>
        <span
          onClick={() => navigate("/home/transfer")}
          href="#"
          className="flex md:flex-col sm:flex-col sm:items-center items-cener block space-x-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700  "
        >
          <AiOutlineTransaction className="text-indigo-400 h-12 w-12" />
          <h5 className="mb-2 flex items-center  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Transfer
          </h5>
          {/* <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
        </span>

        <span
          onClick={() => navigate("/home/invest")}
          href="#"
          className="flex items-cener sm:flex-col sm:items-center block space-x-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 "
        >
          <GiReceiveMoney className="text-pink-500 h-12 w-12" />
          <h5 className="mb-2 flex items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Invest
          </h5>
          {/* <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
        </span>
      </div>
    </div>
  );
};
