"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function DashboardHome() {
    const { user } = useUser();

    return (
        <main className="min-h-screen bg-background flex flex-col items-center  px-2">
            <div className="w-full max-w-md relative bg-card rounded-2xl shadow-2xl p-4 mt-8 flex flex-col min-h-[calc(100vh-4rem)]">
                <div className="flex items-center relative  justify-between mb-5">
                    <div className="relative ">
                        <HamburgerMenu />
                    </div>
                    <h1 className="flex-1 text-center text-text text-lg font-bold cursor-pointer"
                        onClick={() => window.location.href = "/dashboard"}
                    >
                        Eatlator
                    </h1>
                    <div className="text-right">
                        <UserButton />
                    </div>
                </div>
                <p className="mb-4 text-text text-xl font-semibold text-center">
                    Hi, {user?.firstName || user?.username}!
                </p>

                <div className="flex flex-col gap-5">
                    <Link href="/dashboard/translator" className="block">
                        <div className="flex items-center gap-4 bg-black hover:bg-neutral-900 transition rounded-2xl px-5 py-4 shadow-lg">
                            <span className="text-white">
                                {/* Book Icon */}
                                <svg width={32} height={32} viewBox="0 0 30 30" fill="none" className="mr-2">
                                    <path fill="currentColor" d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 16 C 3 17.093063 3.9069372 18 5 18 L 7 18 L 12 18 L 12 22 L 8 22 L 8 19 L 7 18 L 6 19 L 6 22 L 8 24 L 12 24 L 12 25 C 12 26.105 12.895 27 14 27 L 25 27 C 26.105 27 27 26.105 27 25 L 27 14 C 27 12.895 26.105 12 25 12 L 18 12 L 18 5 C 18 3.9069372 17.093063 3 16 3 L 5 3 z M 5 5 L 16 5 L 16 12 L 14 12 C 12.895 12 12 12.895 12 14 L 12 16 L 5 16 L 5 5 z M 12 14 L 12 13 C 11.755293 13 11.521351 12.969766 11.291016 12.933594 C 11.314874 12.916254 11.341774 12.902596 11.365234 12.884766 C 12.436415 12.070668 13 10.75101 13 9 L 14 9 L 14 8 L 11 8 L 11 6.5 L 10 6.5 L 10 8 L 7 8 L 7 9 L 12 9 C 12 10.54899 11.563585 11.478941 10.759766 12.089844 C 10.53998 12.25688 10.278088 12.396887 9.9902344 12.517578 C 9.667359 12.357894 9.3640918 12.177141 9.109375 11.962891 C 8.3922951 11.359732 8 10.591752 8 10 L 7 10 C 7 10.997248 7.5736736 11.978924 8.4648438 12.728516 C 8.5238513 12.778149 8.5962189 12.817683 8.6582031 12.865234 C 8.1567671 12.945359 7.6170728 13 7 13 L 7 14 C 8.1153185 14 9.1081165 13.884672 9.9570312 13.605469 C 10.57585 13.850013 11.261979 14 12 14 z M 18.402344 15.976562 L 20.59375 15.976562 L 22.962891 23.023438 L 21.009766 23.023438 L 20.570312 21.474609 L 18.269531 21.474609 L 17.816406 23.023438 L 16.039062 23.023438 L 18.402344 15.976562 z M 19.382812 17.564453 L 18.611328 20.185547 L 20.232422 20.185547 L 19.476562 17.564453 L 19.382812 17.564453 z"></path>
                                </svg>

                            </span>
                            <div>
                                <div className="text-lg font-semibold text-white">Menu Translator</div>
                                <div className="text-sm text-gray-400">Translate restaurant menus using your camera.</div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/suggestor" className="block">
                        <div className="flex items-center gap-4 bg-black hover:bg-neutral-900 transition rounded-2xl px-5 py-4 shadow-lg">
                            <span className="text-white">
                                {/* Sun Icon */}
                                <svg width={32} height={32} viewBox="0 0 32 32" fill="none" className="mr-2">
                                    <path fill="currentColor" d="M 6.8125 2.40625 L 5.40625 3.8125 L 7.5 5.90625 L 8.90625 4.5 Z M 25.1875 2.40625 L 23.09375 4.5 L 24.5 5.90625 L 26.59375 3.8125 Z M 16 3.03125 C 15.671875 3.035156 15.335938 3.054688 15 3.09375 C 14.988281 3.09375 14.980469 3.09375 14.96875 3.09375 C 10.914063 3.558594 7.6875 6.835938 7.125 10.875 C 6.675781 14.125 8.015625 17.070313 10.25 18.96875 C 11.207031 19.789063 11.796875 20.882813 12 22 L 12 28 L 14.28125 28 C 14.628906 28.597656 15.261719 29 16 29 C 16.738281 29 17.371094 28.597656 17.71875 28 L 20 28 L 20 24 L 20.09375 24 L 20.09375 22.8125 C 20.09375 21.347656 20.855469 19.867188 22.09375 18.71875 C 23.75 17.0625 25 14.707031 25 12 C 25 7.058594 20.933594 2.984375 16 3.03125 Z M 16 5.03125 C 19.863281 4.976563 23 8.140625 23 12 C 23 14.09375 22.03125 15.9375 20.6875 17.28125 L 20.71875 17.3125 C 19.375 18.566406 18.515625 20.207031 18.28125 22 L 13.90625 22 C 13.6875 20.285156 12.949219 18.628906 11.5625 17.4375 C 9.796875 15.933594 8.742188 13.675781 9.09375 11.125 C 9.53125 7.972656 12.085938 5.441406 15.21875 5.09375 C 15.480469 5.0625 15.742188 5.035156 16 5.03125 Z M 2 12 L 2 14 L 5 14 L 5 12 Z M 27 12 L 27 14 L 30 14 L 30 12 Z M 7.5 20.09375 L 5.40625 22.1875 L 6.8125 23.59375 L 8.90625 21.5 Z M 24.5 20.09375 L 23.09375 21.5 L 25.1875 23.59375 L 26.59375 22.1875 Z M 14 24 L 18 24 L 18 26 L 14 26 Z"></path>
                                </svg>
                            </span>
                            <div>
                                <div className="text-lg font-semibold text-white">Recipe Suggestion</div>
                                <div className="text-sm text-gray-400">Find recipes using the ingredients you have at home.</div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/finder" className="block">
                        <div className="flex items-center gap-4 bg-black hover:bg-neutral-900 transition rounded-2xl px-5 py-4 shadow-lg">
                            <span className="text-white">

                                <svg width={32} height={32} viewBox="0 0 1024 1024" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill="#fff"
                                        stroke="#fff"
                                        d="M853.988 783.582L704.985 634.578c29.249-49.501 46.054-107.229 46.054-168.891 0-183.636-148.866-332.504-332.503-332.504S86.034 282.051 86.034 465.688 234.9 798.19 418.536 798.19c61.662 0 119.39-16.805 168.892-46.055L736.43 901.138c32.462 32.462 85.094 32.462 117.558 0 32.462-32.461 32.462-85.094 0-117.556z m-435.452-21.339c-163.784 0-296.557-132.775-296.557-296.556 0-163.784 132.773-296.557 296.557-296.557 163.782 0 296.556 132.773 296.556 296.557 0 163.781-132.773 296.556-296.556 296.556z m411.939 115.384c-19.476 19.478-51.056 19.478-70.534 0L615.726 733.411a334.417 334.417 0 0 0 70.421-70.379l148.017 151.781c19.478 19.479 15.789 43.336-3.689 62.814z"
                                    />
                                </svg>
                            </span>
                            <div>
                                <div className="text-lg font-semibold text-white">Recipe Finder</div>
                                <div className="text-sm text-gray-400">Find recipes by name or keyword.</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
