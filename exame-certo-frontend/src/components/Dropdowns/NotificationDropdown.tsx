import React, { useState, useRef } from "react";
import { createPopper } from "@popperjs/core";


export default function NotificationDropdown() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const btnDropdownRef = useRef<HTMLAnchorElement>(null);
    const popoverDropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        if (dropdownVisible) {
            setDropdownVisible(false);
        } else {
            if (btnDropdownRef.current && popoverDropdownRef.current) {
                createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
                    placement: "bottom-start",
                });
            }
            setDropdownVisible(true);
        }
    };

    return (
        <>
            <a
                className="text-blueGray-500 block py-1 px-3"
                href="#pablo"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown();
                }}
            >
                <i className="fas fa-bell"></i>
            </a>
            <div
                ref={popoverDropdownRef}
                className={`${
                    dropdownVisible ? "block" : "hidden"
                } bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`}
            >
                {["Action", "Another action", "Something else here"].map((text, index) => (
                    <a
                        key={index}
                        href="#pablo"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                        onClick={(e) => e.preventDefault()}
                    >
                        {text}
                    </a>
                ))}
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                <a
                    href="#pablo"
                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    onClick={(e) => e.preventDefault()}
                >
                    Separated link
                </a>
            </div>
        </>
    );
}