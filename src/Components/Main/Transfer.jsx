import React, { useState, useContext } from 'react'
import { InsideNav } from './InsideNav'
import AppSettings from '../../app.settings.json'
import axios from 'axios'
import { GlobalContext } from '../../App'

export const Transfer = () => {
    const { pendingTransfer } = useContext(GlobalContext)

    const [transferInfo, setTransferInfo] = useState({
        sender: localStorage.getItem("username"),
        receiver: "",
        amount: "",
        status: "pending"
    })
    const [isUserNotFound, setUserNotFound] = useState(false);
    const [loader, setLoader] = useState(false)
    const [toast, setToast] = useState({
        show: false,
        message: ""
    })

    const createTransfer = async (e) => {
        e.preventDefault()
        setLoader(true)
        console.log("transferInfo", transferInfo)
        await axios.post(`${AppSettings.APIserver}/transfer`, transferInfo).then(res => {

            if (res.data.message === "user_not_found") setUserNotFound(true)
            else {
                setTransferInfo({
                    ...transferInfo,
                    receiver: "",
                    amount: "",
                })
                setToast({
                    show: true,
                    message: "Transfer was successful!"
                })
            }
            setLoader(false)

        }).catch(e => console.log(e))
    }
    return (
        <div className="w-full">
            <InsideNav name="transfer" />

            <form className={`mt-4 w-3/5 border border-gray-100 p-6 rounded shadow-md ${pendingTransfer && 'opacity-40'}`} onSubmit={createTransfer} >

                <div class="p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span class="font-base"> Balance:</span> ฿ 73.58428
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receiver username</label>
                    <input
                        disabled={pendingTransfer}
                        value={transferInfo.receiver}
                        onChange={(e) => {
                            setUserNotFound(false)
                            setTransferInfo({ ...transferInfo, receiver: e.target.value })
                        }}
                        type="text" id="password" class={`${isUserNotFound && 'border border-red-500'} shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`} required placeholder="Enter username" />
                    {isUserNotFound && <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span class="font-medium">Oops!</span> User not found
                    </p>}
                </div>
                <div class="mb-6">
                    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transfer Amount (BTC)</label>
                    <input
                        disabled={pendingTransfer}
                        value={transferInfo.amount}
                        onChange={(e) => setTransferInfo({ ...transferInfo, amount: e.target.value })}
                        type="number" id="repeat-password" class={` shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`} required
                        placeholder="0.2 BTC Maximuim Per Transfer" max="0.2" step="0.1" min="0.0" />
                </div>

                <button disabled={loader || pendingTransfer} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                    {loader ?
                        <span> <svg aria-hidden="true" role="status" class="inline mr-2 w-5 h-5  text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                        </svg>
                            Transfering...</span> :

                        <span>Complete Transfer</span>
                    }
                </button>
            </form>
            {
                toast.show &&
                <div id="toast-success" class={`fixed -left-100 ${toast.show && 'left-62'} transition transition-duration-300 ml-4 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        <span class="sr-only">Check icon</span>
                    </div>
                    <div class="ml-3 text-sm font-normal">{toast.message}.</div>
                    <button onClick={() => setToast({ message: "", show: false })} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                        <span class="sr-only">Close</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            }

        </div>
    )
}
