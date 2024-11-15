import DashSidebar from "@/components/Sidebar/DashSidebar";
import DashFooter from "@/components/Footer/DashFooter";
import DashNavbar from "@/components/Navbars/DashNavbar"
import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <DashSidebar />
            <div className="p-2 sm:ml-64">
                <DashNavbar/>
                <main className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-800 rounded mb-4">
                    {children}
                </main>
                <DashFooter/>
            </div>
        </>
    );
}