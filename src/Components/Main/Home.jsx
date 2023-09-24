import React, { useContext, useState } from "react";
import { HomeNavbar } from "../Pages/Navbar";
import { Sidebar } from "./Sidebar";
import { Withdraw } from "../Pages/Withdraw";
import { Main } from "./Main";
import { Invest } from "../Pages/Invest";
import { Transfer } from "../Pages/Transfer";
import { Deposite } from "../Pages/Deposite";
import { About } from "../Pages/About";
import { ChangePassword } from "../Pages/ChangePassword";
import { Partners } from "../Pages/Partners";
import { Calculator } from "../Pages/Calculator";
import { Contact } from "../Pages/Contact";

import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "../../App";
export const HomeWrapper = () => {
  const { pendingTransfer, setOpen, open } = useContext(GlobalContext);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="themask dark:bg-gray-700">
      <HomeNavbar setOpen={setOpen} setShowSidebar={setShowSidebar} />
      {open && <ChangePassword />}
      <div className="flex items-start">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="m-4 w-full">
          <Routes>
            <Route path="" element={pendingTransfer ? <Invest /> : <Main />} />
            <Route path="deposite" element={<Deposite />} />
            <Route path="invest" element={<Invest />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="about" element={<About />} />
            <Route path="partners" element={<Partners />} />
            <Route path="contact_us" element={<Contact />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="change_password" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
