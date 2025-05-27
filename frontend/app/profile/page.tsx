"use client";
import { UserProfile } from "@clerk/nextjs";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center py-6">
            <div className="w-full max-w-md flex flex-col items-center">
                <div className="w-full flex items-center mb-4">
                    <HamburgerMenu />
                    <h1 className="flex-1 text-center text-text text-lg font-bold">Profil</h1>
                    <div className="w-10" />
                </div>
                <div className="rounded-2xl shadow-2xl bg-white p-2">
                    <UserProfile />
                </div>
            </div>
        </main>
    );
}
