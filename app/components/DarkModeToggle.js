"use client"
import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if dark mode was previously enabled
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const isDarkMode = !darkMode;
        setDarkMode(isDarkMode);

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className='w-full pr-5 pt-2 justify-end inline-flex'>
            <label className="inline-flex gap-2 cursor-pointer">
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                <input type="checkbox" value="" className="sr-only peer" onClick={toggleDarkMode} />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:ring-blue-300 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
};

export default DarkModeToggle;
