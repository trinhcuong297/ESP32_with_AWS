import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "./sidebar";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";

export default function MainLayout({children}: {children: React.ReactNode}) {
    return <>
        <NextTopLoader />
        <Toaster />
        <Header />
        <div className="flex h-screen overflow-hidden pt-16">
            <Sidebar />
            {children}
        </div>
        </>
}