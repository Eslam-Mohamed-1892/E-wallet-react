import dayjs from 'dayjs'
import React, { useActionState, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import useLocalStorage from "../hooks/useLocalStorage"
import { Navigate } from "react-router-dom"


export default function TransactionsHistory() {
    const [loggedUser] = useLocalStorage("user", null)

    const [transactions, setTransactions] = useLocalStorage("transactions", [])
    const [balance, setBalance] = useLocalStorage("balance", 0)
    const [message2, setMessage2] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const amountInput = useRef()
    const [showTransactions, setShowTransactions] = useState(false)
    const [confirmInput, setConfirmInput] = useState("")
    const openBalanceModal = () => {
        document.getElementById('my_modal_1').showModal()
    }
    if (!loggedUser) {
        return <div className='text-black dark:text-white'>Please login first</div>
    }
    const showBalance = () => {
        const savePassword = "189202"
        if (passwordInput == savePassword) {
            setMessage2(`${balance}`)
        } else {
            setMessage2("------")
        }
        setPasswordInput("")
    }
    const depositAmount = () => {
        const amount = +amountInput.current.value
        if (amount <= 0 || isNaN(amount)) {
            toast.error("ادخل رقم صحيح")
            return
        }
        let newTransaction = {
            previosBalance: balance,
            transactionType: "deposit",
            amount: amount,
            currentBalance: balance + amount,
            time: dayjs().format('DD/MM/YYYY • hh:mm A')
        }
        let copy = [...transactions]
        copy.push(newTransaction)
        setTransactions(copy)
        setBalance(balance + amount)
        amountInput.current.value = ""
    }
    const withdrawAmount = () => {
        const amount = +amountInput.current.value
        if (amount <= 0 || isNaN(amount)) {
            toast.error("ادخل رقم صحيح")
            return
        }
        if (amount <= balance) {
            let newTransaction = {
                previosBalance: balance,
                transactionType: "withdraw",
                amount: amount,
                currentBalance: balance - amount,
                time: dayjs().format('DD/MM/YYYY • hh:mm A')
            }
            let copy = [...transactions]
            copy.push(newTransaction)
            setTransactions(copy)
            setBalance(balance - amount)

        } else {
            toast.error("balance is not enough")
        }
        amountInput.current.value = ""
    }

    const openConfirmModal = () => {
        if (transactions.length === 1) return

        document.getElementById('confirmModal').showModal()

    }
    const deleteConfirm = () => {
        if (transactions.length === 1) return

        const last = transactions[transactions.length - 1]

        let newBalance = balance

        const userConfirm = confirmInput.trim().toLowerCase()

        if (userConfirm !== "yes" && userConfirm !== "no") {
            toast.error("بلاش غباء اكتب اللي قولت لك عليه")
        }

        else if (userConfirm === "yes") {
            if (last.transactionType === "deposit") {
                newBalance -= last.amount
            } else if (last.transactionType === "withdraw") {
                newBalance += last.amount
            }
            toast.success("تم الحذف بنجاح ي كبير")

            const copy = [...transactions]
            copy.pop()

            setTransactions(copy)
            setBalance(newBalance)
        } else if (userConfirm === "no") {
            toast('احسن برضو', {
                icon: '👏',
            });
        }
        setConfirmInput("")
    }


    return (
        <div className='flex flex-col items-center py-4 md:py-6'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='w-95 h-60 bg-white dark:bg-[#1E293B] rounded mb-5 p-5 flex flex-col items-center'>
                <span className='flex flex-row items-center gap-5 justify-end'>
                    <h1 className='text-black dark:text-white font-bold'>Your balance is : {message2}</h1>
                    <button onClick={openBalanceModal} className='btn btn-success text-white'>Show Balance</button>
                </span>
                <input ref={amountInput} type="text" className=' input input-success w-full text-black mb-5 placeholder:text-black font-bold mt-5' placeholder='Enter the amount' />
                <span className='flex flex-row gap-5 mb-5'>
                    <button onClick={depositAmount} className='btn btn-success text-white font-bold'>Deposit</button>
                    <button onClick={withdrawAmount} className='btn btn-error text-white font-bold'>Withdraw</button>
                </span>
            </div>
            <button onClick={() => setShowTransactions(!showTransactions)}
                className={`btn ${showTransactions ? "bg-error" : "bg-success"} text-white mb-5`}> {showTransactions ? "Close" : "Show Transactions"}</button>
            {showTransactions && (
                <>

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block w-full h-50 overflow-y-auto rounded-lg shadow">

                        <table className='table w-full bg-white dark:bg-[#1E293B] text-center'>

                            <thead className='sticky top-0 bg-white dark:bg-[#1E293B]'>
                                <tr className='text-black dark:text-white'>
                                    <th>seq</th>
                                    <th>previous balance</th>
                                    <th>transaction type</th>
                                    <th>amount</th>
                                    <th>current balance</th>
                                    <th>day • time</th>
                                    <th>action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((el, index) => (
                                    <tr key={index} className='text-black dark:text-white'>

                                        <td>{index + 1}</td>

                                        <td>{el.previosBalance}</td>

                                        <td
                                            className={
                                                el.transactionType === "deposit"
                                                    ? "text-success font-semibold"
                                                    : "text-error font-semibold"
                                            }
                                        >
                                            {el.transactionType}
                                        </td>

                                        <td
                                            className={
                                                el.transactionType === "deposit"
                                                    ? "text-success font-bold"
                                                    : "text-error font-bold"
                                            }
                                        >
                                            {el.transactionType === "deposit" ? "+" : "-"}
                                            {el.amount}
                                        </td>

                                        <td>{el.currentBalance}</td>

                                        <td>{el.time}</td>

                                        <td>
                                            {index === transactions.length - 1 && (
                                                <button
                                                    onClick={openConfirmModal}
                                                    className='btn btn-sm btn-error text-white'
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>


                    {/* MOBILE CARDS */}
                    <div className='grid grid-cols-1 md:hidden gap-4 w-full'>

                        {transactions.map((el, index) => (
                            <div
                                key={index}
                                className='bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow text-black dark:text-white'
                            >

                                <p className='font-bold mb-2'>
                                    Transaction #{index + 1}
                                </p>

                                <div className='space-y-1'>

                                    <p>
                                        <span className='font-semibold'>
                                            Previous:
                                        </span>{" "}
                                        {el.previosBalance}
                                    </p>

                                    <p
                                        className={
                                            el.transactionType === "deposit"
                                                ? "text-success font-semibold"
                                                : "text-error font-semibold"
                                        }
                                    >
                                        <span className='text-black dark:text-white'>Type:</span>{" "}
                                        {el.transactionType}
                                    </p>

                                    <p
                                        className={
                                            el.transactionType === "deposit"
                                                ? "text-success font-bold"
                                                : "text-error font-bold"
                                        }
                                    >
                                        <span className='text-black dark:text-white'>Amount:</span>{" "}
                                        {el.transactionType === "deposit" ? "+" : "-"}
                                        {el.amount}
                                    </p>

                                    <p>
                                        <span className='font-semibold'>
                                            Current:
                                        </span>{" "}
                                        {el.currentBalance}
                                    </p>

                                    <p>
                                        <span className='font-semibold'>
                                            day • time:
                                        </span>{" "}
                                        {el.time}
                                    </p>

                                </div>

                                {index === transactions.length - 1 && (
                                    <button
                                        onClick={openConfirmModal}
                                        className='btn btn-error btn-sm text-white mt-4 w-full'
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}

                    </div>

                </>
            )}            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h1 className='text-black dark:text-white'>Hello!</h1>
                    <p className="py-4">Enter your password</p>
                    <input value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} type="text" className='input input-success text-black placeholder:text-black' placeholder='Enter your password' />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={showBalance} className="btn btn-success text-white">Submit</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="confirmModal" className="modal">
                <div className="modal-box">
                    <h1 className='text-black'>Delete confirm</h1>
                    <p className="py-4">Write yes or no</p>
                    <input value={confirmInput} onChange={(e) => setConfirmInput(e.target.value)} type="text" className='input input-success text-black placeholder:text-black' placeholder='Enter your password' />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={deleteConfirm} className="btn btn-success text-white">Submit</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
