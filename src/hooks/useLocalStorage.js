import { useState } from "react"

export default function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		try {
			const stored = localStorage.getItem(key)
			if (!stored) return initialValue

			return JSON.parse(stored)
		} catch (error) {
			return initialValue
		}
	})

	const setStoredValue = (newValue) => {
		setValue(newValue)
		localStorage.setItem(key, JSON.stringify(newValue))
	}

	return [value, setStoredValue]
}