"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import FileUpload from "@/components/FileUpload";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Dashboard() {
    const { user } = useUser();
    return (
        <main className="min-h-screen bg-background flex flex-col items-center">
            <div className="w-full max-w-md relative bg-card rounded-2xl shadow-2xl p-4 mt-4 flex flex-col min-h-[calc(100vh-2rem)]">


            <div className="flex items-center justify-between mb-5">
                    <div>
                        <HamburgerMenu />
                    </div>
                    <h1 className="flex-1 text-center text-text text-lg font-bold">Menu Translator</h1>
                    <div className="text-right">
                        <UserButton />
                    </div>
                </div>
                <p className="mb-4 text-text text-xl font-semibold">
                    Hi, {user?.firstName || user?.username}!
                </p>
                <FileUpload />
            </div>
        </main>
    );
}
