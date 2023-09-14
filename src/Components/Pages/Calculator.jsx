import React, { useState, useEffect } from "react";
import Select from "react-select";

const options = [
  { value: "btc", label: "Bitcoin" },
  { value: "usdt", label: "Tether" },
  { value: "usd", label: "USD" },
  { value: "eth", label: "Ethereum" },
  { value: "ada", label: "Cardano" },
  { value: "bnb", label: "Binance Coin" },
  { value: "sol", label: "Solana" },
  { value: "xrp", label: "Ripple (XRP)" },
  { value: "dot", label: "Polkadot" },
  { value: "doge", label: "Dogecoin" },
  { value: "ltc", label: "Litecoin" },
  { value: "link", label: "Chainlink" },
  // Add more cryptocurrencies as needed
];

export const Calculator = () => {
  const [fromCurrency, setFromCurrency] = useState(null); // State for selected "From" currency
  const [toCurrency, setToCurrency] = useState(null); // State for selected "To" currency
  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);

  useEffect(() => {
    const fetchRate = async () => {
      const key = toCurrency?.toUpperCase();

      if (fromCurrency !== undefined || toCurrency !== undefined) {
        await fetch(
          `https://api.coinconvert.net/convert/${fromCurrency}/${toCurrency}?amount=${amount}`
        )
          .then((res) => res.json())
          .then((data) => setAmount2(data[key]));
      }
    };

    fetchRate();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="w-4/5 m-auto mt-20 sm:w-full sm:h-screen ">
      <div className="dark:bg-gray-900 sm:p-4 sm:py-6 rounded">
        <h2 className="text-center text-3xl dark:text-slate-100">
          Cryptocurrency Converter Calculator
        </h2>
        <div className="border rounded dark:bg-gray-800 dark:border-none p-8 sm:px-2 mt-5 w-3/4 m-auto sm:w-full">
          <div>
            <div className="flex justify-between space-x-2 items-center">
              <div className="flex-1">
                <label className="dark:text-slate-100 sm:mb-3">From</label>
                <Select
                  isClearable={true}
                  options={options}
                  onChange={(e) => setFromCurrency(e?.value)}
                />
              </div>
              <div className="flex-1">
                <label className="dark:text-slate-100 sm:mb-1">To</label>
                <Select
                  isClearable={true}
                  options={options}
                  onChange={(e) => setToCurrency(e?.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-2">
            <div className="flex justify-between items-center">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to convert"
                type="number"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded dark:bg-gray-700 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <input
                value={amount2}
                disabled
                type="number"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded dark:bg-gray-700 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
