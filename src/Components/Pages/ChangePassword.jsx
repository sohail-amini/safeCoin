import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../App";
// import { AppSettings } from "../../app.settings.json";
import AppSettings from "../../app.settings.json";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import axios from "axios";
export function ChangePassword() {
  const { open, setOpen } = useContext(GlobalContext);
  const handleOpen = () => setOpen(!open);
  let info = JSON.parse(localStorage.getItem("usr_info"));

  const [passwords, setPasswords] = useState({
    old_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const [error, setError] = useState({
    key: "",
    shown: false,
  });
  const [isBtnDisabled, setBtnDisable] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    setLoader(true);
    await axios
      .post(`${AppSettings.APIserver}/change_pass/${info.id}`, passwords)
      .then((res) => {
        console.log("response", res);
        if (res.data.is_same_pass) {
          toast.success("Password changed successfully!");
          setOpen(false);
        }
        setError({
          key: "wrong_pass",
          shown: true,
        });
        setLoader(false);
      })
      .catch((error) => console.log("error", error));

    console.log("Submit data", passwords);
  };

  useEffect(() => {
    const { confirm_pass, new_pass } = passwords;
    if (confirm_pass !== new_pass || new_pass === "" || confirm_pass === "")
      setBtnDisable(true);
    else setBtnDisable(false);
  }, [passwords]);

  return (
    <div className="fixed bg-themask flex justify-center items-center top-0 left-0 right-0 bottom-0 z-50 w-full ">
      <div className="w-2/5 sm:w-full sm:mx-4 bg-white p-6 rounded dark:bg-gray-600">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl dark:text-slate-100">
            Change Password
          </h2>
          <button
            onClick={() => handleOpen(!open)}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="border-t mt-2">
          <div className="my-2">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Current password
            </label>
            <input
              value={passwords.old_pass}
              onChange={(e) => {
                setPasswords({ ...passwords, old_pass: e.target.value });
              }}
              type="password"
              id="password"
              className={`bg-gray-50 border border-gray-300 ${
                error.shown && error.key === "wrong_pass" && "border-red-400"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              required
            />
            {error.shown && error.key === "wrong_pass" ? (
              <label className="ml-1 text-sm text-red-600">
                Wrong password!
              </label>
            ) : null}
          </div>
          <div className="my-2">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New password
            </label>
            <input
              value={passwords.new_pass}
              onChange={(e) => {
                setPasswords({ ...passwords, new_pass: e.target.value });
                if (e.target.value !== passwords.new_pass)
                  setError({
                    key: "not_match",
                    shown: true,
                  });
                else setError({ key: "", shown: false });
              }}
              type="password"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              required
            />
          </div>
          <div className="my-2">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-100"
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
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              required
            />
            {error.shown && error.key === "not_match" ? (
              <label className="ml-1 text-sm text-red-600">
                Passwords not match
              </label>
            ) : null}
          </div>
        </div>
        <div className="border-t pt-4 flex justify-end mt-4">
          <button
            onClick={() => handleOpen(!open)}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Close
          </button>

          <button
            disabled={isBtnDisabled}
            onClick={handleSubmit}
            type="button"
            className={`text-white bg-blue-700 ${
              isBtnDisabled && "bg-gray-400 text-gray-600 hover:bg-gray-400"
            } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
          >
            {!loader ? (
              <span>Confirm</span>
            ) : (
              <Spinner aria-label="Default status example" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
