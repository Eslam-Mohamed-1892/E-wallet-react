import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import MainHeader from './pages/MainHeader'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TransactionsHistory from './pages/TransactionsHistory'
import useLocalStorage from "./hooks/useLocalStorage"

export default function App() {
	const [theme, setTheme] = useLocalStorage("theme", "dark")
	useEffect(() => {
		document.documentElement.classList.remove("light", "dark")
		document.documentElement.classList.add(theme)
	}, [theme])
	return (
		<div className='w-full min-h-dvh flex flex-col bg-[#F8FAFC] dark:bg-[#0B1220]'>
			<BrowserRouter>
				<MainHeader theme={theme} setTheme={setTheme} />
				<Routes>
					<Route path="/" element={<div className="flex-1 flex justify-center items-center">
						<Login />
					</div>
					} />
					<Route path="/transactions" element={<div className="flex-1 flex justify-center items-center">
						<TransactionsHistory />
					</div>} />
				</Routes>
			</BrowserRouter>

		</div>)
}

