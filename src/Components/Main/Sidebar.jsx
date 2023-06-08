import React from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import { HomeIcon, BanknotesIcon } from '@heroicons/react/24/solid'
import { GiWallet } from 'react-icons/gi'
import { AiOutlineTransaction } from 'react-icons/ai'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { GiReceiveMoney } from 'react-icons/gi'
import { BsInfoCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
export const Sidebar = () => {
   const navigate = useNavigate()
   return (
      <div className="">

         <aside class="block  md:hidden sm:hidden top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0" >
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
               <ul class="space-y-2 font-medium">
                  <li onClick={() => navigate("/home")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                        <HomeIcon className="text-gray-500 h-5 w-5" />
                        <span class="ml-3">Home</span>
                     </a>
                  </li>
                  <li onClick={() => navigate("/home/recharge")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        {/* <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> */}
                        <BanknotesIcon className="text-gray-500 h-5 w-5" />
                        <span class="flex-1 ml-3 whitespace-nowrap">Recharge</span>

                     </a>
                  </li>
                  <li onClick={() => navigate("/home/withdraw")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        {/* <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg> */}
                        <GiWallet className="text-gray-500 h-5 w-5" />
                        <span class="flex-1 ml-3 whitespace-nowrap">Withdraw</span>

                     </a>
                  </li>
                  <li onClick={() => navigate("/home/transfer")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                        <AiOutlineTransaction className="text-gray-500 h-5 w-5" />
                        <span class="flex-1 ml-3 whitespace-nowrap">Transfer</span>
                     </a>
                  </li>
                  <li onClick={() => navigate("/home/echeck")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                        <HiOutlineBadgeCheck className="text-gray-500 h-5 w-5" />
                        <span class="flex-1 ml-3 whitespace-nowrap">Generate eCheck</span>
                     </a>
                  </li>
                  <li onClick={() => navigate("/home/exchange")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                        <RiExchangeDollarLine className="text-gray-500 h-5 w-5" />
                        <span class="flex-1 ml-3 whitespace-nowrap">Exchange eCheck</span>
                     </a>
                  </li>
                  <li onClick={() => navigate("/home/invest")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                        <GiReceiveMoney className="text-gray-500 h-5 w-5" />
                        <span class="flex-1 ml-3 whitespace-nowrap">Invest</span>
                     </a>
                  </li>
                  <li onClick={() => navigate("/home/about")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                        <BsInfoCircle className="text-gray-500 h-5 w-5" />
                        <span class="flex-1 ml-3 whitespace-nowrap">About</span>
                     </a>
                  </li>

                  <li onClick={() => navigate("/home/partners")}>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Partners</span>
                     </a>
                  </li>
               </ul>
            </div>
         </aside>



      </div>
   )
}
