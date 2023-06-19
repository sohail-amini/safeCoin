import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Label, Button, TextInput, Checkbox } from 'flowbite-react';
import AppSettings from '../../app.settings.json'
import axios from 'axios'
import { Toast } from '../Helpers/Toast'
import { GlobalContext } from '../../App'

export const Signup = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [errorInfo, setErrorInfo] = useState({
        status: false,
        message: ""
    })
    const [emailError, setEmailErorr] = useState({
        status: false,
        message: ""
    })
    const { setToast } = useContext(GlobalContext)


    const register = async (e) => {
        e.preventDefault()

        if (userData.password.length >= 6) {
            await axios.post(`${AppSettings.APIserver}/register`, userData)
                .then(res => {
                    console.log(res)
                    if (res.data.key === "success") {
                        console.log(res.data)
                        const { username, id, token, account_type } = res.data

                        let user_info = {
                            username,
                            id,
                            token,
                            account_type
                        }

                        localStorage.setItem("usr_info", JSON.stringify(user_info))
                        // localStorage.setItem("token", res.data.token)
                        navigate("/home")
                    }
                    else if (res.data.key === "username_is_taken") {
                        setErrorInfo({
                            status: true,
                            message: "Username is Taken"
                        })
                    } else if (res.data.key === "email_is_taken") {
                        setEmailErorr({
                            status: true,
                            message: "Email address is already registered!"
                        })
                    }
                })
                .catch(e => console.log(e))
        } else {
            setErrorInfo({
                status: false,
                message: ""
            })
        }
    }

    return (
        <div className="flex justify-center items-center bg-gray-100 h-screen">
            <Toast left="left-100" top="top-100" />
            <form className="flex flex-col gap-4 w-1/3 p-5 m-auto bg-white rounded border border-gray-100" onSubmit={register}>

                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email2"
                            value="Your email"
                        />
                    </div>
                    <TextInput
                        color={emailError.status ? "failure" : "gray"}
                        id="email2"
                        placeholder="name@flowbite.com"
                        required
                        shadow
                        helperText={emailError.status && <span className="font-medium">{emailError.message}</span>}
                        value={userData.email}
                        onChange={(e) => {
                            setEmailErorr({
                                status: false,
                                message: ""
                            })
                            setUserData({ ...userData, email: e.target.value })
                        }}
                        type="email"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="username"
                            value="Username"
                        />
                    </div>
                    <TextInput
                        color={errorInfo.status ? "failure" : "gray"}
                        id="username"
                        required
                        shadow
                        helperText={errorInfo.status && <span className="font-medium">{errorInfo.message}</span>}
                        type="text"
                        value={userData.username}
                        onChange={(e) => {
                            setErrorInfo({
                                status: false,
                                message: ""
                            })
                            setUserData({ ...userData, username: e.target.value })
                        }}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password"
                            value="Password"
                        />
                    </div>
                    <TextInput
                        id="password"
                        required
                        shadow
                        type="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree">
                        I agree with the
                        <a
                            className="ml-1 text-cyan-600 hover:underline dark:text-cyan-500"
                            href="#"
                        >
                            Terms and conditions
                        </a>
                    </Label>
                </div>
                <Button type="submit">
                    Register new account
                </Button>
                <div>
                    <span onClick={() => navigate("/login")} className="inline  cursor-pointer text-md text-gray-500">
                        Login
                    </span>
                </div>
            </form>
        </div>
    )
}
