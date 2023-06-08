import React, {useEffect} from 'react'
import { InsideNav } from './InsideNav'
export const Invest = (props) => {
    const {transferInfo} = props;
    
  

    return (
        <div className="w-full m-4">
            <InsideNav name="invest" />

        {
            transferInfo && 
            <div class="text-base p-4 my-4  h-24 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium mr-2">Hello {transferInfo.receiver}!</span> 
                The user <b> {transferInfo.sender} </b> has recently tried to transfer <b> {transferInfo.amount} </b> ฿TC ($ 10615.93) to your account. Our system witheld the transfer because free-trial accounts cannot send or receive Bitcoin through our service. Once you make an investment in any of our VIP plans, our system will automatically add the <b> {transferInfo.amount} </b> ฿TC ($ 10615.93) to your VIP account balance.

            </div>
        }
            

            <div className="grid grid-cols-3 my-6 space-x-4">

                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Basic Plan</h5>
                    <span class="my-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 py-2 px-4 rounded dark:bg-blue-900 dark:text-blue-300">5%
                    </span> <b className="text-sm">After 24 hours</b>

                    <ul class="space-y-1 my-4 text-gray-500 list-disc list-inside ">
                        <li>
                            Min invest: <b>50$</b>
                        </li>
                        <li>
                            Max invest: <b>499$</b>
                        </li>
                        <li>
                            Instant Withdraw
                        </li>
                        <li>
                            Referral Commission: <b>10%</b>
                        </li>
                    </ul>

                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Invest Now
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>

                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Corporate Plan</h5>
                    <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-2 rounded dark:bg-green-900 dark:text-green-300">12%</span>

                    <b className="text-sm">After 48 hours</b>

                    <ul class="space-y-1 my-4 text-gray-500 list-disc list-inside ">
                        <li>
                            Min invest: <b>500$</b>
                        </li>
                        <li>
                            Max invest: <b>4,999$</b>
                        </li>
                        <li>
                            Instant Withdraw
                        </li>
                        <li>
                            Referral Commission: <b>10%</b>
                        </li>
                    </ul>

                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Invest Now
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>

                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Plantium Plan</h5>
                    <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-3 py-2 rounded dark:bg-yellow-900 dark:text-yellow-300">20%</span>
                    <b className="text-sm">After 72 hours</b>

                    <ul class="space-y-1 my-4 text-gray-500 list-disc list-inside ">
                        <li>
                            Min invest: <b>5000$</b>
                        </li>
                        <li>
                            Max invest: <b>Unlitimed</b>
                        </li>
                        <li>
                            Instant Withdraw
                        </li>
                        <li>
                            Referral Commission: <b>10%</b>
                        </li>
                    </ul>

                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Invest Now
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>

            </div>


        </div>
    )
}
