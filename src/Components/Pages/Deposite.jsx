import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AppSettings from "../../app.settings.json";
import { Loader } from "../Helpers/Loader";
import { GlobalContext } from "../../App";

export const Deposite = () => {
  const location = useLocation();
  const [depositeInfo, setDepositeInfo] = useState({});
  const { userinfo } = useContext(GlobalContext);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const createInvoice = async (pk) => {
    await axios(`${AppSettings.APIserver}/create_payment/${pk}`)
      .then((res) => {
        if (res.data.error) setError(true);
        setDepositeInfo(res.data);
        setLoader(false);
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    setLoader(true);
    if (location.state.last_route === "invest") {
      createInvoice(location.state.productId);
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
                <span className="font-medium mb-4 text-gray-600 dark:text-slate-300">
                  Send 0.005 btc to this address:
                </span>{" "}
                <b className="block mt-4 sm:inline">{depositeInfo.address}</b>
              </div>
            )}
            <div className="mt-3">
              <span>Or scan this QR code</span>
              <a className="inline" href="#home">
                <img
                  alt="safecoin"
                  src={`https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&address=${depositeInfo.address}&amount=30&color=1`}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
