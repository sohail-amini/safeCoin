import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label, Button, TextInput, Checkbox, Spinner } from "flowbite-react";
import AppSettings from "../../app.settings.json";
import axios from "axios";
import { Toast } from "../Helpers/Toast";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import usdt from "../../assets/usdt.png";
import ReCAPTCHA from "react-google-recaptcha";

export const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    pass: "",
    confirm_pass: "",
    phone: "",
    pin_code: "",
  });
  const [errorInfo, setErrorInfo] = useState({
    status: false,
    message: "",
  });
  const [emailError, setEmailErorr] = useState({
    status: false,
    message: "",
  });
  const [loader, setLoader] = useState(false);
  const [isBot, setIsBot] = useState(true);

  const onVerify = (token) => {
    if (token) {
      setIsBot(false);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(userData.pass);
    if (userData.pass.length >= 6) {
      const { confirm_pass, ...userDataToSend } = userData;
      await axios
        .post(`${AppSettings.APIserver}/register`, userDataToSend)
        .then((res) => {
          console.log(res);
          if (res.data.key === "success") {
            const { username, id, token, account_type } = res.data;

            let user_info = {
              username,
              id,
              token,
              account_type,
            };

            localStorage.setItem("usr_info", JSON.stringify(user_info));
            // localStorage.setItem("token", res.data.token)
            navigate("/home");
          } else if (res.data.key === "username_is_taken") {
            setErrorInfo({
              status: true,
              message: "Username is Taken",
            });
          } else if (res.data.key === "email_is_taken") {
            setEmailErorr({
              status: true,
              message: "Email address is already registered!",
            });
          }
        })
        .catch((e) => console.log(e));
    } else {
      setErrorInfo({
        status: false,
        message: "",
      });
    }
    setLoader(false);
  };

  return (
    <div className="flex justify-center items-center w-full items-center bg-gray-100 h-screen dark:bg-gray-600">
      <Toast left="left-100" top="top-100" />
      <div className="p-2 shadow-lg flex flex-cols w-full m-auto bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-900">
        <div className="flex-1 flex flex-col items-start px-4 pt-10  px-4 border-r">
          <h2 className="text-3xl font-bold mt-2 mb-6 font-400 text-gray-600 border-b pb-4 block dark:text-gray-100">
            Create Account and trade safely
          </h2>
          <h2 className="self-end mt-12 mb-12 text-4xl font-bold text-gray-500 leading-16 dark:text-gray-100 ">
            🔥Buy, trade, and hold cryptocurrencies on SafeCoin.
          </h2>
          <div className="flex flex-cols">
            <span className="bg-blue-100 flex items-center inline text-blue-800 text-xs font-medium p-4 mr-2 rounded dark:bg-blue-900 dark:text-blue-300">
              <BsCurrencyBitcoin className="inline text-xl" />
              <b className="ml-2 text-xl">Bitcoin</b>
            </span>
            <span className="bg-gray-100 flex items-center text-gray-800 text-xs font-medium mr-2 p-4 rounded dark:bg-gray-700 dark:text-gray-300">
              <FaEthereum className="inline text-xl" />
              <b className="ml-2 text-xl">Ethereum</b>
            </span>
            <span className="bg-green-100 text-green-800 flex items-center text-xs font-medium mr-2 p-4 rounded dark:bg-green-900 dark:text-red-300">
              <img src={usdt} className="h-8 w-8" />
              <b className="ml-2 text-xl">USDT</b>
            </span>
          </div>
        </div>

        <form
          className="flex-1 flex flex-col gap-4 m-3 p-6 "
          onSubmit={register}
        >
          <div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                color={errorInfo.status ? "failure" : "gray"}
                id="username"
                required
                shadow
                helperText={
                  errorInfo.status && (
                    <span className="font-medium">{errorInfo.message}</span>
                  )
                }
                type="text"
                value={userData.username}
                onChange={(e) => {
                  setErrorInfo({
                    status: false,
                    message: "",
                  });
                  setUserData({ ...userData, username: e.target.value });
                }}
              />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              color={emailError.status ? "failure" : "gray"}
              id="email2"
              placeholder="name@flowbite.com"
              required
              shadow
              helperText={
                emailError.status && (
                  <span className="font-medium">{emailError.message}</span>
                )
              }
              value={userData.email}
              onChange={(e) => {
                setEmailErorr({
                  status: false,
                  message: "",
                });
                setUserData({ ...userData, email: e.target.value });
              }}
              type="email"
            />
          </div>

          <div className="flex flex-row flex-wrap	space-x-2">
            <div className="flex-1">
              <Label htmlFor="username" value="Password" />
              <TextInput
                id="password"
                required
                shadow
                type="password"
                value={userData.pass}
                onChange={(e) =>
                  setUserData({ ...userData, pass: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="username" value="Confirm Password" />
              <TextInput
                id="confirm_pass"
                required
                shadow
                type="password"
                value={userData.confirm_pass}
                onChange={(e) =>
                  setUserData({ ...userData, confirm_pass: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-row space-x-2 flex-wrap">
            <div className="flex-1">
              <Label htmlFor="username" value="Phone number" />
              <TextInput
                id="phone"
                required
                shadow
                type="number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex-2">
              <Label htmlFor="username" value="PIN code" />
              <TextInput
                id="code"
                required
                shadow
                type="text"
                value={userData.pin_code}
                onChange={(e) =>
                  setUserData({ ...userData, pin_code: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree">
              I agree with the
              <a
                className="ml-1 text-cyan-600 hover:underline dark:text-cyan-500"
                href="#"
              >
                Terms and conditions
              </a>
            </Label>
          </div>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={onVerify}
          />
          <Button type="submit" disabled={loader || isBot}>
            {!loader ? (
              <span>Register new account</span>
            ) : (
              <Spinner aria-label="Default status example" />
            )}
          </Button>
          <div>
            <span
              onClick={() => navigate("/login")}
              className="inline  cursor-pointer text-md text-gray-500 dark:text-gray-100"
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
