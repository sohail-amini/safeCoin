import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppSettings from "../../app.settings.json";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import axios from "axios";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  let info = JSON.parse(localStorage.getItem("usr_info"));

  const [passwords, setPasswords] = useState({
    old_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const [username, setUsername] = useState("");
  const [error, setError] = useState({
    key: "",
    shown: false,
  });
  const [isBtnDisabled, setBtnDisable] = useState(false);

  const handleSubmit = async () => {
    setLoader(true);
    await axios
      .post(`${AppSettings.APIserver}/reset_pass`, { username, ...passwords })
      .then((res) => {
        if (res.data.status === "Success") {
          toast.success("Password changed successfully!");
          navigate("/login");
        }
        if (res.data.status === "user_not_found")
          toast.error("User not found!");

        setLoader(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const { confirm_pass, new_pass } = passwords;
    if (confirm_pass !== new_pass || new_pass === "" || confirm_pass === "")
      setBtnDisable(true);
    else setBtnDisable(false);
  }, [passwords]);

  return (
    <section class="bg-gray-50 dark:bg-gray-900 h-screen ">
      <div class="flex flex-col  w-1/3 xl:2/3 md:w-3/5 sm:w-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#home"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          SafeCoin
        </a>
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John_Doe"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                placeholder="••••••••"
                value={passwords.new_pass}
                onChange={(e) => {
                  setPasswords({ ...passwords, new_pass: e.target.value });
                }}
                type="password"
                id="password"
                className={`bg-gray-50 border border-gray-300 ${
                  error.shown && error.key === "wrong_pass" && "border-red-400"
                } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                required
              />
              {error.shown && error.key === "wrong_pass" ? (
                <label className="ml-1 text-sm text-red-600">
                  Wrong password!
                </label>
              ) : null}
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                id="confirm_pass"
                value={passwords.confirm_pass}
                onChange={(e) => {
                  setPasswords({ ...passwords, confirm_pass: e.target.value });
                  if (e.target.value !== passwords.new_pass)
                    setError({
                      key: "not_match",
                      shown: true,
                    });
                  else
                    setError({
                      key: "",
                      shown: false,
                    });
                }}
                type="password"
                className={`bg-gray-50 border border-gray-300 ${
                  error.shown &&
                  error.key === "not_match" &&
                  "border-1 border-red-400 outline-red-600"
                } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                required
              />
              {error.shown && error.key === "not_match" ? (
                <label className="ml-1 text-sm text-red-600">
                  Passwords not match
                </label>
              ) : null}
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div class="ml-3 text-sm">
                <label
                  for="newsletter"
                  class="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#terms"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              disabled={isBtnDisabled}
              type="button"
              onClick={() => handleSubmit()}
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
            <button
              type="button"
              class="text-gray-400"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
