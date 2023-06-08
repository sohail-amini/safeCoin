import React, {useState, useEffect} from 'react'
import { HomeNavbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Withdraw } from './Withdraw'
import { Main } from './Main'
import { Recharge } from './Recharge'
import { Invest } from './Invest'
import { Transfer } from './Transfer'
import { Routes, Route } from "react-router-dom";
import AppSettings from '../../app.settings.json'
import axios from 'axios'

export const HomeWrapper = () => {
    const [pendingTransfer, setPendingTransfer] = useState(false);
    const [pendingTransferInfo, setPendingTransferInfo] = useState(false);
    
    useEffect(() => {
        const pendingTransfer = async () => {
        
        await axios(`${AppSettings.APIserver}/latest_pending_transfer/${'cloner2254'}`,)
        .then(res => {
            if (res.data.status === "pending") {
                setPendingTransfer(true)
                setPendingTransferInfo(res.data)
            }
        })
        .catch(e => console.log(e))
        }
        pendingTransfer()   
    }, [])
    return (
        <div className="dark:bg-gray-700">
            <HomeNavbar />
            <div className="flex items-start">
                <Sidebar />
                <Routes>
                    <Route path="" element={pendingTransfer ? <Invest transferInfo={pendingTransferInfo}/> : <Main />  } />
                    <Route path="recharge" element={<Recharge />} />
                    <Route path="withdraw" element={<Withdraw />} />
                    <Route path="invest" element={<Invest />} />
                    <Route path="transfer" element={<Transfer />} />
                </Routes>
            </div>
        </div>
    );
}