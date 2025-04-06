import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
	theme: string;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
	theme: "light",
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	// Initialize state with the value from localStorage or fallback to the user's device preference
	const getInitialTheme = () => {
		if (typeof window !== "undefined") {
			// Check localStorage first
			const storedTheme = localStorage.getItem("theme");
			if (storedTheme) {
				return storedTheme;
			}

			// If not found in localStorage, check the system's preferred color scheme
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			return prefersDark ? "dark" : "light";
		}
		return "light"; // default to light if window is not available (for server-side rendering)
	};

	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}

		// Save the theme to localStorage whenever it changes
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
