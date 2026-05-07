import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenu } from "react-icons/hi";

export default function MainHeader() {
    const [open, setOpen] = useState(false)

    return (
        <div className='relative'>
            
            {/* HEADER */}
            <div className='flex justify-center'>
                <div className="container bg-gray-50 rounded flex justify-between items-center mx-auto px-3 md:px-5 lg:px-7 py-3">
                    
                    <h1 className='text-[22px] md:text-2xl lg:text-3xl font-bold tracking-tight'>
                        El Dakhlawi Cash
                    </h1>

                    <nav className='hidden md:flex gap-5 text-1xl font-bold cursor-pointer'>
                        <Link to="/">Log in</Link>
                        <Link to="/transactions" onClick={() => setOpen(false)}>Transactions</Link>
                    </nav>

                    <HiMenu
                        className='w-7 h-7 cursor-pointer md:hidden'
                        onClick={() => setOpen(!open)}
                    />
                </div>
            </div>

            {/* DROPDOWN MENU (OUTSIDE HEADER) */}
            {open && (
                <div className='md:hidden absolute top-full left-0 w-full bg-[#0E0E0E] flex flex-col items-center gap-4 py-4 text-white shadow-lg'>
                    <Link to="/" onClick={() => setOpen(false)}>Log in</Link>
                    <Link to="/transactions" onClick={() => setOpen(false)}>Transactions</Link>
                </div>
            )}

        </div>
    )
}