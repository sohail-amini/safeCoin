import React, { useContext, useEffect, useState } from "react";
import { InsideNav } from "../Main/InsideNav";
import { Loader } from "../Helpers/Loader";
import { GlobalContext } from "../../App";
import AppSettings from "../../app.settings.json";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { DeleteModal } from "../Helpers/InvestDeleteModal";
import { EditModal } from "../Helpers/InvestEditModal";
import axios from "axios";
export const Invest = (props) => {
  const { pendingTransferInfo, userRole, btcRate } = useContext(GlobalContext);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    title: "",
    subtitle: "",
    price: null,
    min_invest: "",
    max_invest: "",
    commision: "",
  });
  const [loader, setLoader] = useState(false);
  const [isNewPackage, setIsNewPackage] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  let info = JSON.parse(localStorage.getItem("usr_info"));

  useEffect(() => {
    setLoader(true);
    const fetchProducts = async () => {
      await fetch(`${AppSettings.APIserver}/products`)
        .then((response) => response.json())
        .then((data) => {
          setLoader(false);
          setPackages(data);
        })
        .catch((error) => {
          setLoader(false);
          console.log(error);
        });
    };
    fetchProducts();
  }, []);

  const updatePackage = async (id) => {
    await axios
      .put(`${AppSettings.APIserver}/products/${id}`, {
        ...selectedProduct,
        price: +(currentPrice / btcRate.toFixed(6)),
      })
      .then((res) => {
        setPackages((prevPackages) => {
          return prevPackages.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ...selectedProduct,
                price: +(currentPrice / btcRate.toFixed(6)),
              };
            }
            return item;
          });
        });
        setOpenEditModal(false);
      })
      .catch(() => console.log("Something went wrong!"));

    setLoader(false);
  };
  const deletePackage = async () => {
    await axios
      .delete(`${AppSettings.APIserver}/products/${selectedProduct.id}`)
      .then((res) => {
        setLoader(false);
        setPackages((prevPackages) => {
          return prevPackages.filter((item) => item.id !== selectedProduct.id);
        });
        setOpenDeleteModal(false);
      })
      .catch(() => console.log("Something went wrong!"));
  };
  const createPackage = async () => {
    await axios
      .post(`${AppSettings.APIserver}/products`, selectedProduct)
      .then((response) => {
        console.log("response", response);
        setPackages(response.data.products);
        setOpenEditModal(false);
      })
      .catch(() => console.log("Error in creating new package"));
    setSelectedProduct({
      title: "",
      subtitle: "",
      price: null,
      min_invest: "",
      max_invest: "",
      commision: "",
    });
    setLoader(false);
  };

  return (
    <div>
      <DeleteModal
        deletePackage={deletePackage}
        setOpenModal={setOpenDeleteModal}
        openModal={openDeleteModal}
      />
      {openEditModal && (
        <EditModal
          setOpenModal={setOpenEditModal}
          openModal={openEditModal}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          updatePackage={updatePackage}
          loader={loader}
          setLoader={setLoader}
          isNewPackage={isNewPackage}
          createPackage={createPackage}
          currentPrice={currentPrice}
          setCurrentPrice={setCurrentPrice}
        />
      )}
      {loader ? (
        <Loader />
      ) : (
        <div className="w-full">
          <InsideNav name="invest" />

          {pendingTransferInfo && (
            <div
              className="text-base p-4 my-4 sm:p-0  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium mr-2">
                Hello {pendingTransferInfo.receiver}!
              </span>
              The user <b> {pendingTransferInfo.sender} </b> has recently tried
              to transfer <b> ₿{pendingTransferInfo.amount.toFixed(5)} </b>
              <b>(${(pendingTransferInfo.amount * btcRate).toFixed(2)}) </b> to
              your account. Our system witheld the transfer because free-trial
              accounts cannot send or receive Bitcoin through our service. Once
              you make an investment in any of our VIP plans, our system will
              automatically add the{" "}
              <b>₿{pendingTransferInfo.amount.toFixed(5)}</b> to your VIP
              account balance.
            </div>
          )}

          {localStorage.getItem("userRole") === "admin" && (
            <div className="flex sm:flex-col sm:items-end sm:gap-y-2 justify-between items-center">
              <div
                className="flex items-center p-4 mb-4 text-sm w-2/5 sm:w-full sm:text-xl sm:m-0 sm:mr-2 mt-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 mr-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Maximum plan available.</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedProduct({
                    title: "",
                    subtitle: "",
                    price: null,
                    min_invest: "",
                    max_invest: "",
                    commision: "",
                  });
                  setIsNewPackage(true);
                  setOpenEditModal(true);
                }}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                New Package
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 my-6 sm:grid-cols-1 gap-2 sm:space-x-0 sm:space-y-4 sm:p-0">
            {packages.map((pck) => {
              let labelBgColor =
                pck.id === 1
                  ? "bg-red-100 dark:bg-slate-200 dark:text-blue-900"
                  : pck.id === 2
                  ? "bg-green-100 "
                  : "bg-yellow-100 dark:bg-yellow-200 dark:text-blue-900";
              return (
                <div
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  key={pck.productId}
                >
                  {localStorage.getItem("userRole") === "admin" && (
                    <div className="flex justify-between mb-2">
                      <BiEditAlt
                        onClick={() => {
                          setSelectedProduct(pck);
                          setOpenEditModal(true);
                        }}
                        size={20}
                        className="text-gray-500 cursor-pointer dark:text-slate-300"
                      />
                      <AiOutlineDelete
                        onClick={() => {
                          setSelectedProduct(pck);
                          setOpenDeleteModal(true);
                        }}
                        size={20}
                        className="text-red-500 cursor-pointer dark:text-red-400"
                      />
                    </div>
                  )}
                  <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {pck.title}
                  </h5>
                  <b className="dark:text-slate-200 mb-2 block">
                    Price: {pck.price.toFixed(5)} BTC ({"$"}
                    {(pck.price * btcRate).toLocaleString("en-US", {
                      maximumFractionDigits: 1,
                    })}
                    )
                  </b>
                  <span
                    className={`my-2 ${labelBgColor}  text-blue-800 text-sm font-medium mr-2 py-2 px-4 rounded dark:bg-blue-900 dark:text-blue-300`}
                  >
                    {pck.subtitle}
                  </span>
                  {/* <b className="text-sm">{ }</b> */}

                  <ul className="space-y-1 my-4 text-gray-500 list-disc list-inside dark:text-slate-300">
                    <li>
                      Min invest:
                      <b> {pck.min_invest}</b>
                    </li>
                    <li>
                      Max invest: <b> {pck.max_invest}</b>
                    </li>
                    <li>Instant Withdraw</li>
                    <li>
                      Referral Commission: <b>{pck.commision}</b>
                    </li>
                  </ul>

                  <button
                    onClick={() =>
                      navigate("/home/deposite", {
                        state: {
                          last_route: "invest",
                          productId: pck.id,
                          productPrice: pck.price,
                          btcRate,
                        },
                      })
                    }
                    className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    UPGRADE
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
