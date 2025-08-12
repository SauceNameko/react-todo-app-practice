import { useEffect, useState } from "react";

export const useLocalStorage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleClickThemeChange = () => {
        setIsDarkMode(!isDarkMode);
    }
    useEffect(() => {
        if (localStorage.getItem("theme") == "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);
    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "white");
        }
    }, [isDarkMode]);
    return { isDarkMode, handleClickThemeChange };
}