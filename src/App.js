import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Login } from "./Components/Authentication/Login";
import { Signup } from "./Components/Authentication/Signup";
import { HomeWrapper } from "./Components/Main/Home";
import AppSettings from './app.settings.json'
import axios from 'axios'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {Toaster} from 'react-hot-toast'
export const GlobalContext = React.createContext();

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function App() {
//   var socket = new WebSocket("wss://www.blockonomics.co/payment/"+ "bc1qtwxwmlcfq57zmyjl8kyg2z7qkt0ldxh07zzjj5");
//   socket.onmessage = function(event){
//     console.log(event)
//   }
//   socket.onopen = function(event) {
//   console.log("WebSocket connection established.");
// };

// socket.onmessage = function(event) {
//   console.log("Received message:", event.data);
//   // Handle the received message here
// };

// socket.onerror = function(event) {
//   console.error("WebSocket error:", event);
// };

// socket.onclose = function(event) {
//   console.log("WebSocket connection closed.");
// };

  
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
    const [balance, setBalance] = useState(0.0)

    useEffect(() => {
      
      const pendingTransfer = async () => {
      const userInfo = JSON.parse(localStorage.getItem("usr_info"))
      await axios(`${AppSettings.APIserver}/latest_pending_transfer/${userInfo.username}`, {
        
        headers: {
          Authorization: `Bearer ${userInfo.token}`
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


      }, 1000);
    return () => clearInterval(interval);
  }, []);

  

  useEffect(() => {
    let token = ""
    if (localStorage.getItem('usr_info')) {
      token = JSON.parse(localStorage.getItem('usr_info')).token;
    }
      
    console.log(token)
    
    axios(`${AppSettings.APIserver}/protected`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then((e) => {
      console.log(e)
      navigate("/home/")
    })
    .catch(e => {
      console.log(e)
      navigate("/login") 
    })
  }, []);

  return (
    <> 
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
      }}
      containerStyle={{
        top:100
      }}
    />
    <GlobalContext.Provider 
    
      value={{ toast, setToast, prices, pendingTransfer, pendingTransferInfo,  setPendingTransferInfo, setPendingTransfer, balance, setBalance }}>
      <Routes>
        <Route path="/home/*" element={<HomeWrapper />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </GlobalContext.Provider>
    </>
  );
}

export default App;
