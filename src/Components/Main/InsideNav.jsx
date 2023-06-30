import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { GlobalContext } from '../../App'
export const InsideNav = ({ name }) => {

    const { prices, pendingTransfer } = useContext(GlobalContext);
    const location = useLocation()
    console.log(prices)
    return (
        <nav className="flex flex-col space-y-2" aria-label="Breadcrumb">
            <div className="block grid grid-cols-4 text-center">
                <span className="py-4 px-2 text-base bg-blue-100 text-blue-800 font-medium mr-2 rounded dark:bg-blue-900 dark:text-blue-300">
                    Bitcoin: ${prices.btc}
                </span>
                <span className="bg-gray-100 text-gray-800 text-base font-medium mr-2 py-4 px-2 rounded dark:bg-gray-700 dark:text-gray-300">
                    Ethereum: ${prices.eth}
                </span>
                <span className="bg-red-100 text-red-800 text-base font-medium mr-2 py-4 px-2 rounded dark:bg-red-900 dark:text-red-300">
                    BNB ${prices.bnb}
                </span>
                <span className="bg-green-100 text-green-800 text-base font-medium mr-2 py-4 px-2 rounded dark:bg-green-900 dark:text-green-300">
                    XRP ${prices.xrp}
                </span>
            </div>
            {
                pendingTransfer && (location.pathname !== "/home" && location.pathname !== "/home/invest") &&
                <div className="w-3/5 mt-4 p-4 mb-4 text-base text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                    <span className="font-medium">Warning!</span> Please upgrade your level.
                </div>
            }




        </nav>
    )
}
