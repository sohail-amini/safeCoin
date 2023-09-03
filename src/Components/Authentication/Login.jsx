import React, { useState, useContext } from "react";
import { Label, Button, TextInput, Checkbox, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import AppSettings from "../../app.settings.json";
import axios from "axios";
import { Toast } from "../Helpers/Toast";
import { GlobalContext } from "../../App";
import ReCAPTCHA from "react-google-recaptcha";

export const Login = () => {
  const { setPendingTransfer, setPendingTransferInfo, setToast } =
    useContext(GlobalContext);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isBot, setIsBot] = useState(true);

  const onVerify = (token) => {
    if (token) {
      setIsBot(false);
    }
  };

  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    setLoader(true);
    await axios
      .post(`${AppSettings.APIserver}/login`, userData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          const { username, id, token, account_type } = res.data;

          let user_info = {
            username,
            id,
            token,
            account_type,
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
        console.log(e);
        setToast({
          show: true,
          message: e.response.data.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-600 h-screen">
      <Toast left="left-10" top="top-10" />
      <form
        className="bg-white rounded flex flex-col gap-4 dark:bg-gray-800 border border-gray-100 dark:border-gray-600 w-1/3 p-5 m-auto"
        onSubmit={login}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
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
          <TextInput
            id="password1"
            required
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <a href="#" className="text-sm text-[#155E75]">
            Forgot password
          </a>
        </div>
        <ReCAPTCHA
          sitekey="6LcLuDInAAAAAM6NUcZOCaACCzfPQp6dPjUu454s"
          onChange={onVerify}
        />
        <Button type="submit">
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
