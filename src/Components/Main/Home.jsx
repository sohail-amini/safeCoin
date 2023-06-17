import React, { useState, useContext } from 'react'
import { HomeNavbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Withdraw } from './Withdraw'
import { Main } from './Main'
import { Recharge } from './Recharge'
import { Invest } from './Invest'
import { Transfer } from './Transfer'
import { Deposite } from './Deposite'
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from '../../App'
export const HomeWrapper = () => {
    const { pendingTransfer } = useContext(GlobalContext)
    return (
        <div className="dark:bg-gray-700">
            <HomeNavbar />
            <div className="flex items-start">
                <Sidebar />
                <div className="m-4">
                    <Routes>
                        <Route path="" element={pendingTransfer ? <Invest /> : <Main />} />
                        <Route path="recharge" element={<Recharge />} />
                        <Route path="deposite" element={<Deposite />} />
                        <Route path="invest" element={<Invest />} />
                        <Route path="transfer" element={<Transfer />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}