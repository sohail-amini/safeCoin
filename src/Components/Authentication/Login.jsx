import React, { useState, useContext } from 'react'
// import {Label} from 'react'
import { Label, Button, TextInput, Checkbox, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'
import AppSettings from '../../app.settings.json'
import axios from 'axios'
import { Toast } from '../Helpers/Toast'
import { GlobalContext } from '../../App'

export const Login = () => {
    const { setPendingTransfer, setPendingTransferInfo, setToast } = useContext(GlobalContext)
    const [loader, setLoader] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()
    const login = async (e) => {
        e.preventDefault()
        setLoader(true)
        await axios.post(`${AppSettings.APIserver}/login`, userData).then(res => {
            console.log(res)
            if (res.status === 200) {
                localStorage.setItem("username", res.data.username)
                localStorage.setItem("token", res.data.token)
                axios(`${AppSettings.APIserver}/latest_pending_transfer/${localStorage.getItem("username")}`)
                    .then(res => {
                        if (res.data.status === "pending") {
                            setPendingTransfer(true)
                            setPendingTransferInfo(res.data)
                        }
                    })
                    .catch(e => console.log(e))

                navigate("/home")
            }
            setLoader(false)
        }).catch(e => {
            setLoader(false)
            console.log(e)
            setToast({
                show: true,
                message: e.response.data.message
            })
        })
    }

    return (
        <div className="flex justify-center items-center bg-gray-100 h-screen">
            <Toast />
            <form className="bg-white rounded flex flex-col gap-4 border border-gray-100 w-1/3 p-5 m-auto" onSubmit={login}>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="username"
                            value="Username"
                        />
                    </div>
                    <TextInput
                        id="username"
                        placeholder="Username"
                        required
                        type="text"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password1"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        id="password1"
                        required
                        type="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                </div>
                <div className="flex items-center justify-between ">

                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">
                            Remember me
                        </Label>
                    </div>
                    <a href="#" className="text-sm text-[#155E75]">
                        Forgot password
                    </a>
                </div>
                <Button type="submit" disabled={loader} >
                    {!loader ? <span>Submit</span> :
                        <Spinner aria-label="Default status example" />
                    }

                </Button>
                <div>
                    <span onClick={() => navigate("/signup")} className="text-sm text-gray-600 cursor-pointer inline">Create Account</span>
                </div>

            </form>
        </div>
    )
}
