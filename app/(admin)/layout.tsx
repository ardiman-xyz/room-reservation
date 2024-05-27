import React from "react";

import {DesktopSidebar} from "./_components/desktop-sidebar";
import {TopBar} from "./_components/top-bar";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <DesktopSidebar />
            <div className="flex flex-col">
                <TopBar />

                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <DynamicBreadcrumb />
                    {children}
                </main>

            </div>
        </div>
    )
}

export default AdminLayout;