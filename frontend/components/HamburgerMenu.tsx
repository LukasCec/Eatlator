"use client";
import React, { useState } from "react";
import Link from "next/link";

const MENU_ITEMS = [
    {
        label: "Menu Translator",
        href: "/dashboard/translator",
        icon: (

            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 30 30" className="text-white mr-2">
                <path fill="currentColor" d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 16 C 3 17.093063 3.9069372 18 5 18 L 7 18 L 12 18 L 12 22 L 8 22 L 8 19 L 7 18 L 6 19 L 6 22 L 8 24 L 12 24 L 12 25 C 12 26.105 12.895 27 14 27 L 25 27 C 26.105 27 27 26.105 27 25 L 27 14 C 27 12.895 26.105 12 25 12 L 18 12 L 18 5 C 18 3.9069372 17.093063 3 16 3 L 5 3 z M 5 5 L 16 5 L 16 12 L 14 12 C 12.895 12 12 12.895 12 14 L 12 16 L 5 16 L 5 5 z M 12 14 L 12 13 C 11.755293 13 11.521351 12.969766 11.291016 12.933594 C 11.314874 12.916254 11.341774 12.902596 11.365234 12.884766 C 12.436415 12.070668 13 10.75101 13 9 L 14 9 L 14 8 L 11 8 L 11 6.5 L 10 6.5 L 10 8 L 7 8 L 7 9 L 12 9 C 12 10.54899 11.563585 11.478941 10.759766 12.089844 C 10.53998 12.25688 10.278088 12.396887 9.9902344 12.517578 C 9.667359 12.357894 9.3640918 12.177141 9.109375 11.962891 C 8.3922951 11.359732 8 10.591752 8 10 L 7 10 C 7 10.997248 7.5736736 11.978924 8.4648438 12.728516 C 8.5238513 12.778149 8.5962189 12.817683 8.6582031 12.865234 C 8.1567671 12.945359 7.6170728 13 7 13 L 7 14 C 8.1153185 14 9.1081165 13.884672 9.9570312 13.605469 C 10.57585 13.850013 11.261979 14 12 14 z M 18.402344 15.976562 L 20.59375 15.976562 L 22.962891 23.023438 L 21.009766 23.023438 L 20.570312 21.474609 L 18.269531 21.474609 L 17.816406 23.023438 L 16.039062 23.023438 L 18.402344 15.976562 z M 19.382812 17.564453 L 18.611328 20.185547 L 20.232422 20.185547 L 19.476562 17.564453 L 19.382812 17.564453 z"></path>
            </svg>
        ),
    },
    {
        label: "Recipe Suggestion",
        href: "/dashboard/suggestor",
        icon: (

            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 32 32" className="text-white mr-2">
                <path fill="currentColor" d="M 6.8125 2.40625 L 5.40625 3.8125 L 7.5 5.90625 L 8.90625 4.5 Z M 25.1875 2.40625 L 23.09375 4.5 L 24.5 5.90625 L 26.59375 3.8125 Z M 16 3.03125 C 15.671875 3.035156 15.335938 3.054688 15 3.09375 C 14.988281 3.09375 14.980469 3.09375 14.96875 3.09375 C 10.914063 3.558594 7.6875 6.835938 7.125 10.875 C 6.675781 14.125 8.015625 17.070313 10.25 18.96875 C 11.207031 19.789063 11.796875 20.882813 12 22 L 12 28 L 14.28125 28 C 14.628906 28.597656 15.261719 29 16 29 C 16.738281 29 17.371094 28.597656 17.71875 28 L 20 28 L 20 24 L 20.09375 24 L 20.09375 22.8125 C 20.09375 21.347656 20.855469 19.867188 22.09375 18.71875 C 23.75 17.0625 25 14.707031 25 12 C 25 7.058594 20.933594 2.984375 16 3.03125 Z M 16 5.03125 C 19.863281 4.976563 23 8.140625 23 12 C 23 14.09375 22.03125 15.9375 20.6875 17.28125 L 20.71875 17.3125 C 19.375 18.566406 18.515625 20.207031 18.28125 22 L 13.90625 22 C 13.6875 20.285156 12.949219 18.628906 11.5625 17.4375 C 9.796875 15.933594 8.742188 13.675781 9.09375 11.125 C 9.53125 7.972656 12.085938 5.441406 15.21875 5.09375 C 15.480469 5.0625 15.742188 5.035156 16 5.03125 Z M 2 12 L 2 14 L 5 14 L 5 12 Z M 27 12 L 27 14 L 30 14 L 30 12 Z M 7.5 20.09375 L 5.40625 22.1875 L 6.8125 23.59375 L 8.90625 21.5 Z M 24.5 20.09375 L 23.09375 21.5 L 25.1875 23.59375 L 26.59375 22.1875 Z M 14 24 L 18 24 L 18 26 L 14 26 Z"></path>
            </svg>
        ),
    },
    {
        label: "Profile",
        href: "/profile",
        icon: (
            <img
                className="mr-2"
                width={22}
                height={22}
                src="https://img.icons8.com/puffy-filled/32/FFFFFF/user.png"
                alt="user-male-circle"
            />
        )
    },
    {
        label: "Settings",
        href: "/settings",
        icon: ( <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={22} height={22} viewBox="0 0 72 72" className="text-white mr-2">
            <path fill="currentColor" d="M57.531,30.556C58.96,30.813,60,32.057,60,33.509v4.983c0,1.452-1.04,2.696-2.469,2.953l-2.974,0.535	c-0.325,1.009-0.737,1.977-1.214,2.907l1.73,2.49c0.829,1.192,0.685,2.807-0.342,3.834l-3.523,3.523	c-1.027,1.027-2.642,1.171-3.834,0.342l-2.49-1.731c-0.93,0.477-1.898,0.889-2.906,1.214l-0.535,2.974	C41.187,58.96,39.943,60,38.491,60h-4.983c-1.452,0-2.696-1.04-2.953-2.469l-0.535-2.974c-1.009-0.325-1.977-0.736-2.906-1.214	l-2.49,1.731c-1.192,0.829-2.807,0.685-3.834-0.342l-3.523-3.523c-1.027-1.027-1.171-2.641-0.342-3.834l1.73-2.49	c-0.477-0.93-0.889-1.898-1.214-2.907l-2.974-0.535C13.04,41.187,12,39.943,12,38.491v-4.983c0-1.452,1.04-2.696,2.469-2.953	l2.974-0.535c0.325-1.009,0.737-1.977,1.214-2.907l-1.73-2.49c-0.829-1.192-0.685-2.807,0.342-3.834l3.523-3.523	c1.027-1.027,2.642-1.171,3.834-0.342l2.49,1.731c0.93-0.477,1.898-0.889,2.906-1.214l0.535-2.974C30.813,13.04,32.057,12,33.509,12	h4.983c1.452,0,2.696,1.04,2.953,2.469l0.535,2.974c1.009,0.325,1.977,0.736,2.906,1.214l2.49-1.731	c1.192-0.829,2.807-0.685,3.834,0.342l3.523,3.523c1.027,1.027,1.171,2.641,0.342,3.834l-1.73,2.49	c0.477,0.93,0.889,1.898,1.214,2.907L57.531,30.556z M36,45c4.97,0,9-4.029,9-9c0-4.971-4.03-9-9-9s-9,4.029-9,9	C27,40.971,31.03,45,36,45z"></path>
        </svg>) },
];

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="p-2 text-text"
                aria-label="Open menu"
            >
                <svg width={32} height={32} fill="none" viewBox="0 0 24 24">
                    <rect y={6} width={24} height={2} rx={1} fill="currentColor" />
                    <rect y={11} width={24} height={2} rx={1} fill="currentColor" />
                    <rect y={16} width={24} height={2} rx={1} fill="currentColor" />
                </svg>
            </button>


            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 bg-black ${open ? " pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setOpen(false)}
                aria-hidden={!open}
            />

            <aside
                className={`
                    fixed top-0 left-0 w-64 max-w-[90vw] h-full
                    bg-card z-50 shadow-2xl border-r border-white/10
                    transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    flex flex-col
                `}
                style={{ willChange: "transform" }}
            >
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="text-lg font-bold text-text">Eatlator</span>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-text text-xl"
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>
                <nav className="flex flex-col p-4 gap-3">
                    {MENU_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-text text-base py-2 px-3 rounded-xl hover:bg-background hover:text-primary transition flex items-center"
                            onClick={() => setOpen(false)}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}
