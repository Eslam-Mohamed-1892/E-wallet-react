import React, { useActionState, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import useLocalStorage from "../hooks/useLocalStorage"

export default function Login({ setLoggedUser, loggedUser }) {
    const [phone, setPhone] = useState("")
    const [users, setUsers] = useState([
        { name: "Eslam", phoneNum: "01143676424" },
        { name: "Gamal", phoneNum: "01102991029" }
    ])
    const handleLogin = () => {
        if (phone.length !== 11) {
            toast.error("رقم الموبايل لازم يكون 11 رقم")
            return
        }
        const user = users.find((u) => u.phoneNum === phone)

        if (user) {
            setLoggedUser(user)
            setPhone("")
            toast.success('Logged in successfully!')
        } else {
            toast.error("المستخدم مش موجود")
        }
    }

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="container text-white p-5 flex flex-col items-center justify-center rounded-lg w-75 h-75 bg-white dark:bg-[#1E293B]">
                <span className='flex flex-row gap-5'>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin()
                            }
                        }}
                        type="text"
                        className='input input-success text-black placeholder:text-black font-bold'
                        placeholder='Enter your phone number'
                    />
                    <button onClick={handleLogin} className="btn btn-primary">
                        Login
                    </button>
                </span>
                <p className="mt-5 mb-5 text-lg text-black dark:text-white font-bold">Welcome : {loggedUser?.name}</p>
            </div>

        </div>
    )
}
