import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AppSettings from "../../app.settings.json";
import { Loader } from "../Helpers/Loader";
import { GlobalContext } from "../../App";

export const Deposite = () => {
  const location = useLocation();
  const [depositeInfo, setDepositeInfo] = useState({});
  const { loader, userinfo, setLoader } = useContext(GlobalContext);
  const [status, setStatus] = useState("Confirmed");

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

  return error ? (
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
            {!depositeInfo?.error && (
              <div
                className="text-xl sm:text-[15px] sm:mt-4 p-4 text-gray-800 sm:w-11/12 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                role="alert"
              >
                <div>
                  <span className="font-medium mb-4 text-gray-600 dark:text-slate-300">
                    Send {location.state.productPrice} btc to this address:
                  </span>{" "}
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
                    Amount: <b>{location.state.productPrice} BTC</b>{" "}
                  </span>
                </div>
              </div>
            )}
            <div className="mt-3">
              <span>Or scan this QR code</span>
              <img
                className=""
                alt="safecoin"
                src={`https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&address=${depositeInfo.address}&amount=30&color=1`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
