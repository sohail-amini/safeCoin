import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AppSettings from "../../app.settings.json";
import toast from "react-hot-toast";
import { Loader } from "../Helpers/Loader";
import { GlobalContext } from "../../App";

export const Deposite = () => {
  const location = useLocation();
  const [depositeInfo, setDepositeInfo] = useState({});
  const { loader, userinfo, setLoader } = useContext(GlobalContext);
  const [status, setStatus] = useState("Pending");
  const [walletAddress, setWalletAddress] = useState(
    "TAtk2Bzm7iji6VXjZLMHxzZGSJAzirZ3Hy"
  );
  const [error, setError] = useState(false);

  const getIP = async (id, price) => {
    await fetch(`https://api.ipify.org?format=json`)
      .then((res) => res.json())
      .then((res) => {
        createInvoice(id, price, res.ip);
      });
  };

  const createInvoice = async (pk, price, ip) => {
    const userInfo = {
      ip: ip,
      user_agent: navigator.userAgent,
      email: userinfo.email,
    };
    await axios
      .post(`${AppSettings.APIserver}/create_payment/${pk}`, { userInfo })
      .then((res) => {
        if (res.data.error) setError(true);
        setDepositeInfo(res.data);
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    if (location.state.last_route === "invest") {
      getIP(location.state.productId, location.state.productPrice);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        toast.success("Wallet address copied to clipboard!");
        // alert("");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return false ? (
    <b className="text-2xl text-gray-600 dark:text-slate-200 h-screen">
      Some Error, Try Again!
    </b>
  ) : (
    <div>
      {false ? (
        <Loader />
      ) : (
        <div className="dark:text-slate-200">
          <h2 className="text-2xl ml-3 my-3">
            Dear, {userinfo.username} Please Complete Your Investment Deposit
          </h2>
          <div className="flex flex-col">
            {
              <div
                className="text-xl sm:text-[15px] sm:mt-4 p-4 text-gray-800 sm:w-11/12 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                role="alert"
              >
                <div>
                  <span className="font-medium mb-4 text-gray-600 dark:text-slate-300">
                    Send{" "}
                    {(
                      location.state.productPrice * location.state.btcRate
                    ).toLocaleString("en-US", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    USDT to this address: (TRC20/Tron)
                  </span>{" "}
                  <div className="flex items-center justify-between mt-10 px-4 py-2 border rounded-lg shadow-sm max-w-md dark:bg-gray-900 dark:text-white">
                    <p className="text-sm font-mono text-white truncate">
                      {walletAddress}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label="Copy wallet address"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                  </div>
                  <b className="block mt-4 sm:inline">{depositeInfo.address}</b>
                </div>
                <div className="mt-6 flex flex-col">
                  <span>
                    Payment Status:{" "}
                    <b
                      className={`${
                        status === "Pending"
                          ? "text-yellow-500 dark:text-yellow-300"
                          : status === "Confirmed"
                          ? "text-green-500 dark:text-green-200"
                          : "text-gray-500"
                      } `}
                    >
                      {" "}
                      {status}
                    </b>
                  </span>
                  <span>
                    Amount:{" "}
                    <b>
                      {(
                        location.state.productPrice * location.state.btcRate
                      ).toLocaleString("en-US", {
                        maximumFractionDigits: 1,
                      })}{" "}
                      USDT
                    </b>{" "}
                  </span>
                </div>
              </div>
            }
            <div className="mt-3">
              <span>Or scan this QR code</span>
              <img
                className=""
                alt="safecoin"
                src={`https://api.qrcode-monkey.com/qr/custom?data=${encodeURIComponent(
                  walletAddress
                )}&size=300&file=png&download=0`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
