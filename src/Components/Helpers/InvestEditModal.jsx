import { Spinner } from "flowbite-react";
export function EditModal({
  loader,
  setLoader,
  setOpenModal,
  selectedProduct,
  setSelectedProduct,
  updatePackage,
  isNewPackage,
  createPackage,
}) {
  return (
    <div class="fixed top-0 left-0 right-0 z-50 w-full justify-center flex items-center p-4 m-auto bg-themask overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative max-h-full w-2/5 sm:w-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 dark:text-slate-100">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {isNewPackage ? "Create new package" : "Edit this package"}
            </h3>
            <button
              onClick={() => setOpenModal(false)}
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

          <div className="my-2 mx-3 ">
            <label className="dark:text-slate-100 ml-1 mb-1 block">
              Product Name
            </label>
            <input
              value={selectedProduct.title}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  title: e.target.value,
                })
              }
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="my-2 mx-3">
            <label className="dark:text-slate-100 ml-1 mb-1 block">
              Product Rate
            </label>
            <input
              value={selectedProduct.subtitle}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  subtitle: e.target.value,
                })
              }
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="my-2 mx-3">
            <label className="dark:text-slate-100 ml-1 mb-1 block">
              Product Price
            </label>
            <input
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="my-2 mx-3 grid grid-cols-2 space-x-2">
            <div>
              <label className="dark:text-slate-100 ml-1 mb-1 block">
                Min Invest
              </label>
              <input
                value={selectedProduct.min_invest}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    min_invest: e.target.value,
                  })
                }
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="dark:text-slate-100 ml-1 mb-1 block">
                Max Invest
              </label>
              <input
                value={selectedProduct.max_invest}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    max_invest: e.target.value,
                  })
                }
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="my-2 mx-3 ">
            <label className="dark:text-slate-100 ml-1 mb-1 block">
              Commision
            </label>
            <input
              value={selectedProduct.commision}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  commision: e.target.value,
                })
              }
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={() => {
                setLoader(true);
                console.log(isNewPackage);
                if (isNewPackage) {
                  createPackage();
                } else updatePackage(selectedProduct.product_id);
              }}
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {!loader ? (
                <span>Save Changes</span>
              ) : (
                <Spinner aria-label="Default status example" />
              )}
            </button>

            <button
              onClick={() => setOpenModal(false)}
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
