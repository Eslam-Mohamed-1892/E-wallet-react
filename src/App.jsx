import React, { useState } from 'react'
import Login from './pages/Login'
import MainHeader from './pages/MainHeader'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TransactionsHistory from './pages/TransactionsHistory'

export default function App() {
	const [passwordInput, setPasswordInput] = useState("")

	const transactions = () => {
		document.getElementById('my_modal_1').showModal()
	}
	return (
		<div className='w-full min-h-dvh flex flex-col bg-black'>
			<BrowserRouter>
				<MainHeader />
				<Routes>
					<Route path="/" element={<div className="flex-1 flex justify-center items-center">
						<Login />
					</div>
					} />
					<Route path="/transactions" element={<div className="flex-1 flex justify-center items-center">
						<TransactionsHistory onClick={transactions} />
					</div>} />
				</Routes>
			</BrowserRouter>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h1 className='text-black'>Hello!</h1>
					<p className="py-4">Enter your password</p>
					<input value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} type="text" className='input input-success text-black placeholder:text-black' placeholder='Enter your password' />
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn btn-success">Submit</button>
						</form>
					</div>
				</div>
			</dialog>

		</div>)
}

