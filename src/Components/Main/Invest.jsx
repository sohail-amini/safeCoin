import React, { useContext, useEffect, useState } from 'react'
import { InsideNav } from './InsideNav'
import { GlobalContext } from '../../App'
import AppSettings from '../../app.settings.json'
import { useNavigate } from 'react-router-dom'

export const Invest = (props) => {
    const { transferInfo } = props;
    const { prices, pendingTransferInfo, pendingTransfer } = useContext(GlobalContext)
    const [packages, setPackages] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        console.log()
        fetch(`${AppSettings.APIserver}/products`)
            .then(response => response.json())
            .then(data => {
                setPackages(data)
            })
            .catch(error => {
                // Handle any errors that occur during the fetch request
            });

    }, [])



    return (
        <div className="w-full">
            <InsideNav name="invest" />

            {
                pendingTransferInfo &&
                <div className="text-base p-4 my-4  h-24 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium mr-2">Hello {pendingTransferInfo.receiver}!</span>
                    The user <b> {pendingTransferInfo.sender} </b> has recently tried to transfer <b> {pendingTransferInfo.amount} </b> ฿TC <b>(${Math.floor(prices.btc * pendingTransferInfo.amount)}) </b> to your account. Our system witheld the transfer because free-trial accounts cannot send or receive Bitcoin through our service. Once you make an investment in any of our VIP plans, our system will automatically add the <b> {pendingTransferInfo.amount} </b> ฿TC <b>(${Math.floor(prices.btc * pendingTransferInfo.amount)}) </b> to your VIP account balance.

                </div>
            }


            <div className="grid grid-cols-3 my-6 space-x-4">

                {
                    packages.map(pck => (
                        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={pck.productId}>

                            <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pck.title}</h5>
                            <span className={`my-2 ${pck.product_id === 1 ? "bg-blue-100" : pck.product_id === 2 ? "bg-green-100" : "bg-yellow-100"}  text-blue-800 text-sm font-medium mr-2 py-2 px-4 rounded dark:bg-blue-900 dark:text-blue-300`}>
                                {pck.subtitle}
                            </span>
                            {/* <b className="text-sm">{ }</b> */}

                            <ul className="space-y-1 my-4 text-gray-500 list-disc list-inside ">
                                <li>
                                    Min invest: <b>{pck.product_id === 1 ? "$50" : pck.product_id === 2 ? "$500" : "$5000"}</b>
                                </li>
                                <li>
                                    Max invest: <b>{pck.product_id === 1 ? "$499" : pck.product_id === 1 ? "$4999" : "Unlimited"}</b>
                                </li>
                                <li>
                                    Instant Withdraw
                                </li>
                                <li>
                                    Referral Commission: <b>10%</b>
                                </li>
                            </ul>

                            <a onClick={() => navigate("/home/deposite", { state: { last_route: "invest", productId: pck.product_id } })} className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                UPGRADE
                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </a>
                        </div>
                    ))
                }


            </div>


        </div>
    )
}
