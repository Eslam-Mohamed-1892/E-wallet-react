import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import MainHeader from './pages/MainHeader'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import TransactionsHistory from './pages/TransactionsHistory'
import useLocalStorage from "./hooks/useLocalStorage"


export default function App() {
	const [loggedUser, setLoggedUser] = useLocalStorage("user", null)
	console.log("loggedUser =", loggedUser)

	const [theme, setTheme] = useLocalStorage("theme", "dark")
	useEffect(() => {
		document.documentElement.classList.remove("light", "dark")
		document.documentElement.classList.add(theme)
	}, [theme])
	return (
		<div className='w-full min-h-dvh flex flex-col bg-[#f8fafcb4] dark:bg-[#0B1220]'>
			<BrowserRouter>
				<MainHeader theme={theme} setTheme={setTheme} />
				<Routes>
					<Route
						path="/"
						element={
							<div className="flex-1 flex justify-center items-center">
								<Login setLoggedUser={setLoggedUser} loggedUser={loggedUser} />
							</div>
						}
					/>

					<Route
						path="/transactions"
						element={
							loggedUser ? (
								<div className="flex-1 flex justify-center items-center">
									<TransactionsHistory />
								</div>
							) : (
								<Navigate to="/" replace />
							)
						}
					/>
				</Routes>			</BrowserRouter>

		</div>)
}

