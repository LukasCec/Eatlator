"use client";
import React, { useState } from "react";
import Link from "next/link";


const MENU_ITEMS = [
    { label: "Menu Translator", href: "/dashboard" },
    { label: "Recipe Suggestion", href: "/my-menus" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
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
                            className="text-text text-base py-2 px-3 rounded-xl hover:bg-background hover:text-primary transition"
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}
