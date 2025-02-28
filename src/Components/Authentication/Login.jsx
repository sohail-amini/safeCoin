import React, { useState, useContext } from "react";
import { Label, Button, TextInput, Checkbox, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import AppSettings from "../../app.settings.json";
import axios from "axios";
import { Toast } from "../Helpers/Toast";
import { GlobalContext } from "../../App";
import ReCAPTCHA from "react-google-recaptcha";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import eye icons

export const Login = () => {
  const { setPendingTransfer, setPendingTransferInfo, setToast, setUserRole } =
    useContext(GlobalContext);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  // const [isBot, setIsBot] = useState(true);

  // const onVerify = (token) => {
  //   if (token) {
  //     setIsBot(false);
  //   }
  // };

  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    setLoader(true);
    await axios
      .post(`${AppSettings.APIserver}/login`, userData)
      .then((res) => {
        if (res.status === 200) {
          setUserRole(res.data.user_role);
          localStorage.setItem("userRole", res.data.user_role);
          const { username, id, token, account_type, email } = res.data;
          let user_info = {
            username,
            id,
            token,
            account_type,
            email,
          };

          localStorage.setItem("usr_info", JSON.stringify(user_info));

          axios(
            `${
              AppSettings.APIserver
            }/latest_pending_transfer/${localStorage.getItem("username")}`
          )
            .then((res) => {
              if (res.data.status === "pending") {
                setPendingTransfer(true);
                setPendingTransferInfo(res.data);
              }
            })
            .catch((e) => console.log(e));

          navigate("/home");
        }
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log(e.code);
        if (e.code === "ERR_NETWORK")
          setToast({
            show: true,
            message: "Something went wrong!",
          });
        else {
          setToast({
            show: true,
            message: e.response.data.message,
          });
        }
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-600 h-screen bg">
      <Toast left="left-10" top="top-10" />
      <form
        className="bg-white rounded flex flex-col gap-4 dark:bg-gray-800 border border-gray-100 dark:border-gray-600 w-1/3 sm:w-full sm:mx-4 p-5 m-auto"
        onSubmit={login}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            color="gray"
            id="username"
            placeholder="Username"
            required
            type="text"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <div className="relative">
            <TextInput
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <Button
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-1"
              color="white"
            >
              {showPassword ? (
                <HiEyeOff color="white" />
              ) : (
                <HiEye color="white" />
              )}{" "}
              {/* Toggle between eye icons */}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <span
            onClick={() => navigate("/forgot_pass")}
            className="text-sm text-cyan-100"
          >
            Forgot password?
          </span>
        </div>
        {/* <div className="flex justify-center w-full">
          <ReCAPTCHA
            sitekey="6LcLuDInAAAAAM6NUcZOCaACCzfPQp6dPjUu454s"
            onChange={onVerify}
          />
        </div> */}
        <Button type="submit" disabled={loader}>
          {!loader ? (
            <span>Login</span>
          ) : (
            <Spinner aria-label="Default status example" />
          )}
        </Button>
        <div>
          <span
            onClick={() => navigate("/signup")}
            className="text-sm text-gray-600 cursor-pointer inline dark:text-gray-100"
          >
            Create Account
          </span>
        </div>
      </form>
    </div>
  );
};
