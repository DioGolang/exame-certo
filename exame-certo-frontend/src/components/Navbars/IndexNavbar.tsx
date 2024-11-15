"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function IndexNavbar() {
    const [projectName, setProjectName] = useState("");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProjectName(process.env.SITE_NAME || "Projeto Integrador");
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {projectName}
        </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <div className="relative" ref={dropdownRef}>
    <button
        type="button"
    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
>
    <span className="sr-only">Open user menu</span>
    <Image
    className="w-8 h-8 rounded-full"
    width={32}
    height={32}
    src="/img/avatar.jpg"
    alt="user photo"
        />
        </button>

    {isUserDropdownOpen && (
        <div
            className="absolute right-0 mt-2 w-48 origin-top-right z-[100] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        >
        <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
        name@flowbite.com
        </span>
        </div>
        <ul className="py-2">
    <li>
        <a
            href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
        Dashboard
        </a>
        </li>
        <li>
        <a
            href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
        Settings
        </a>
        </li>
        <li>
        <a
            href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
            Sign out
    </a>
    </li>
    </ul>
    </div>
    )}
    </div>

    <button
    type="button"
    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
    <span className="sr-only">Open main menu</span>
    <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 14"
    >
    <path
        stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M1 1h15M1 7h15M1 13h15"
        />
        </svg>
        </button>
        </div>

        <div
    className={`${
        isMobileMenuOpen ? "block" : "hidden"
    } w-full md:flex md:w-auto md:order-1`}
    id="navbar-user"
    >
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <li>
        <a
            href="#"
    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
    aria-current="page"
    >
    Home
    </a>
    </li>
    <li>
    <a
        href="#"
    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    >
    About
    </a>
    </li>
    <li>
    <a
        href="#"
    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    >
    Serviços
    </a>
    </li>
    <li>
    <a
        href="#"
    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    >
    Preço
    </a>
    </li>
    <li>
    <a
        href="#"
    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >
        Contato
        </a>
        </li>
        </ul>
        </div>
        </div>
        </nav>
        </>
);
}