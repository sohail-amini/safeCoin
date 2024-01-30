import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Login } from "./Components/Authentication/Login";
import { Signup } from "./Components/Authentication/Signup";
import { ForgotPassword } from "./Components/Authentication/ForgotPassword";
import { HomeWrapper } from "./Components/Main/Home";
import { Loader } from "./Components/Helpers/Loader";
import AppSettings from "./app.settings.json";
import axios from "axios";

import { Toaster } from "react-hot-toast";
export const GlobalContext = React.createContext();

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function App() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const [prices, setPrices] = useState([]);
  const [btcRate, setBtcRate] = useState(null);

  const [pendingTransfer, setPendingTransfer] = useState(false);
  const [pendingTransferInfo, setPendingTransferInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(0.0);
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [userRole, setUserRole] = useState("");

  let userinfo = JSON.parse(localStorage.getItem("usr_info"));

  if (localStorage.getItem("color-theme") === null)
    localStorage.setItem("color-theme", "dark");

  useEffect(() => {
    const pendingTransfer = async () => {
      if (localStorage.getItem("usr_info")) {
        const userInfo = JSON.parse(localStorage.getItem("usr_info"));
        await axios(
          `${AppSettings.APIserver}/latest_pending_transfer/${userInfo.id}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        )
          .then((res) => {
            if (
              res.data.status === "pending" &&
              userInfo.username !== "admin"
            ) {
              setPendingTransfer(true);
              setPendingTransferInfo(res.data);
            } else {
              setPendingTransfer(false);
            }
          })
          .catch((e) => console.log(e));
      }
    };
    pendingTransfer();
  }, [location.pathname]);

  const getCoinsPrice = () => {
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
        })
          .then((res) => res.json())
          .then((res) => {
            setBtcRate(res[0].rate);
            setPrices(res);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.error("Error occurred during API request:", error);
      }
    }, 10000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    // Coins prices
    getCoinsPrice();
  }, []);

  useEffect(() => {
    let token = "";
    if (localStorage.getItem("usr_info")) {
      token = JSON.parse(localStorage.getItem("usr_info")).token;
    }

    const navigate_login = async () => {
      try {
        await axios(`${AppSettings.APIserver}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((e) => {
            setLoader(false);
            navigate("/home/");
          })
          .catch((e) => {
            console.log(e);
            setLoader(false);
            navigate("/login");
          });
      } catch (e) {
        console.log(e);
      }
    };

    const isUserLoggedIn = () => {
      if (localStorage.getItem("usr_info") === null) navigate("/login");
    };

    isUserLoggedIn();
    navigate_login();
  }, []);

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
        containerStyle={{
          top: 100,
        }}
      />
      <GlobalContext.Provider
        value={{
          toast,
          setToast,
          prices,
          pendingTransfer,
          pendingTransferInfo,
          setPendingTransferInfo,
          setPendingTransfer,
          balance,
          setBalance,
          userinfo,
          setOpen,
          open,
          showMenu,
          setShowMenu,
          setLoader,
          loader,
          userRole,
          setUserRole,
          btcRate,
        }}
      >
        {loader ? (
          <Loader />
        ) : (
          <Routes>
            <Route
              path="/home/*"
              element={<HomeWrapper setShowMenu={setShowMenu} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_pass" element={<ForgotPassword />} />
          </Routes>
        )}
      </GlobalContext.Provider>
    </div>
  );
}
export default App;
