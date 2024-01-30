import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Spinner } from "flowbite-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import AppSettings from "../../app.settings.json";

export const Contact = () => {
  const form = useRef();
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loader, setLoader] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoader(true);
    await axios
      .post(`${AppSettings.APIserver}/send_email`, contactData)
      .then((res) => {
        if (res.data.status === "success") {
          setLoader(false);
          toast.success("You message sent!");
        } else toast.error("Something went wrong!");
      })
      .catch((e) => {
        toast.error("Something went wrong!");
      });
    setLoader(false);

    setContactData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form action="#" className="space-y-8" ref={form} onSubmit={sendEmail}>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your name
            </label>
            <input
              value={contactData.name}
              onChange={(e) =>
                setContactData({ ...contactData, name: e.target.value })
              }
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="John Doe"
              required
              name="user_name"
            />
          </div>
          <div>
            <label
              for="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Email
            </label>
            <input
              value={contactData.email}
              onChange={(e) =>
                setContactData({ ...contactData, email: e.target.value })
              }
              type="email"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Johndoe@example.com"
              required
              name="user_email"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              for="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              required
              value={contactData.message}
              onChange={(e) =>
                setContactData({ ...contactData, message: e.target.value })
              }
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
              name="message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium bg-blue-600 text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {!loader ? (
              <span>Send message</span>
            ) : (
              <Spinner aria-label="Default status example" />
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
