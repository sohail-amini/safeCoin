import React, { useContext } from "react";
import { HomeNavbar } from "../Pages/Navbar";
import { Sidebar } from "./Sidebar";
import { Withdraw } from "../Pages/Withdraw";
import { Main } from "./Main";
import { Recharge } from "../Pages/Recharge";
import { Invest } from "../Pages/Invest";
import { Transfer } from "../Pages/Transfer";
import { Deposite } from "../Pages/Deposite";
import { About } from "../Pages/About";
import { ChangePassword } from "../Pages/ChangePassword";
import { Partners } from "../Pages/Partners";

import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "../../App";
export const HomeWrapper = () => {
  const { pendingTransfer, setOpen, open } = useContext(GlobalContext);

  return (
    <div className="themask dark:bg-gray-700">
      <HomeNavbar setOpen={setOpen} />
      {open && <ChangePassword />}
      <div className="flex items-start">
        <Sidebar />
        <div className="m-4 w-full">
          <Routes>
            <Route path="" element={pendingTransfer ? <Invest /> : <Main />} />
            <Route path="recharge" element={<Recharge />} />
            <Route path="deposite" element={<Deposite />} />
            <Route path="invest" element={<Invest />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="about" element={<About />} />
            <Route path="partners" element={<Partners />} />
            <Route path="change_password" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
