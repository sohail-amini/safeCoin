import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Login } from "./Components/Authentication/Login";
import { Signup } from "./Components/Authentication/Signup";
import { HomeWrapper } from "./Components/Main/Home";
import AppSettings from './app.settings.json'
import axios from 'axios'
import useWebSocket, { ReadyState } from 'react-use-websocket';
export const GlobalContext = React.createContext();




function App() {
  // var socket = new WebSocket("wss://www.blockonomics.co/payment/"+ "bc1q936zrtata4zza56v3n4pnjmudrx7zuleccaam4");
  // socket.onmessage = function(event){
  //   console.log(event)
  // }

  // const { sendMessage, lastMessage, readyState } = useWebSocket("wss://www.blockonomics.co/payment/" + "bc1q936zrtata4zza56v3n4pnjmudrx7zuleccaam4");
  
  
  const [toast, setToast] = useState({
      show: false,
      message: "",
    });
   const [prices, setPrices] = useState({
        btc: 0,
        eth: 0,
        bnb: 0,
        xrp: 0
     })
    const [pendingTransfer, setPendingTransfer] = useState(false);
    const [pendingTransferInfo, setPendingTransferInfo] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
      
      const pendingTransfer = async () => {
      
      await axios(`${AppSettings.APIserver}/latest_pending_transfer/${localStorage.getItem("username")}`, {
        
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      })
      .then(res => {
          if (res.data.status === "pending") {
              setPendingTransfer(true)
              setPendingTransferInfo(res.data)
          } else {
            setPendingTransfer(false)
          }
      })
      .catch(e => console.log(e))
      }
        pendingTransfer()   
    }, [location.pathname])

    useEffect(() => {

      const interval = setInterval(() => {
          try {
            fetch("https://api.livecoinwatch.com/coins/list", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "x-api-key": "3dea6ef1-1c17-4c46-9595-4cd01ccb597c",
              },
              body: JSON.stringify({
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 6,
                meta: false,
              }),
            }).then(res => res.json()).then(res => {
              setPrices({btc: res[0].rate.toFixed(2), eth: res[1].rate.toFixed(2), bnb: res[3].rate.toFixed(2), xrp: res[5].rate.toFixed(2)})
            })

        } catch (error) {
          console.error("Error occurred during API request:", error);
        }


      }, 100000);
    return () => clearInterval(interval);
  }, []);

  

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios(`${AppSettings.APIserver}/protected`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then(() => navigate("/home/"))
    .catch(e => navigate("/login"))
  }, []);

  return (
    <GlobalContext.Provider 
      value={{ toast, setToast, prices, pendingTransfer, pendingTransferInfo,  setPendingTransferInfo, setPendingTransfer }}>
      <Routes>
        <Route path="/home/*" element={<HomeWrapper />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
