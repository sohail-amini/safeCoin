import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Label, Button, TextInput, Checkbox } from 'flowbite-react';
import AppSettings from '../../app.settings.json'
import axios from 'axios'

export const Signup = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })


    const register = async (e) => {
        e.preventDefault()
        
        await axios.post(`${AppSettings.APIserver}/register`, userData)
        .then(res => {
            if (res.data.status === "success") {
                localStorage.setItem("user_id", userData.username)
                navigate("/home")
            }
        })
        .catch(e => console.log(e))
    }

    return (
        <div className="flex justify-center items-center bg-gray-100 h-screen">

            <form className="flex flex-col gap-4 w-1/3 p-5 m-auto bg-white rounded border border-gray-100" onSubmit={register}>

                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email2"
                            value="Your email"
                        />
                    </div>
                    <TextInput
                        id="email2"
                        placeholder="name@flowbite.com"
                        required
                        shadow
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
                        id="username"
                        required
                        shadow
                        type="text"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
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
