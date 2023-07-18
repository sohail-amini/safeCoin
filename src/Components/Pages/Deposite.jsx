import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AppSettings from "../../app.settings.json";

export const Deposite = () => {
  const location = useLocation();
  const [depositeInfo, setDepositeInfo] = useState({});

  const createInvoice = async (pk) => {
    await axios(`${AppSettings.APIserver}/create_payment/${pk}`).then((res) => {
      console.log(res.data);
      setDepositeInfo(res.data);
    });
  };

  useEffect(() => {
    console.log("depositeInfo", depositeInfo);
  }, [depositeInfo]);

  useEffect(() => {
    if (location.state.last_route === "invest") {
      createInvoice(location.state.productId);
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl ml-3">
        {localStorage.getItem("username")}, Please Complete Your Investment
        Deposit
      </h2>
      <div className="flex">
        <a className="inline bg-red-500">
          <img
            src={`https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&address=${depositeInfo.address}&amount=30&color=1`}
          />
        </a>
        <div className="mt-10">
          Send 0.005 btc to this address:
          <b className="block">{depositeInfo.address}</b>
        </div>
      </div>
    </div>
  );
};
