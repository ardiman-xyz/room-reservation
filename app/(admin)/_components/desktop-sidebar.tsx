"use client"

import React from "react";
import Link from "next/link";
import {
    Home,
    Laptop,
    Package,
    Calendar,
    Settings
} from "lucide-react";

import {Logo} from "@/components/logo";
import {Notification} from "@/app/(admin)/_components/notification";
import {BottomSidebar} from "@/app/(admin)/_components/bottom-sidebar";
import {SidebarItem} from "@/app/(admin)/_components/sidebar-item";

export const routes = [
    {
        title: "Dashboard",
        route: "/dashboard",
        icon: Home,

    },
    {
        title: "Master data",
        route: "/master-data",
        icon: Laptop,
        items: [
            {
                title: "Gedung",
                route: "/master-data/building",
            },
            {
                title: "Lantai",
                route: "/master-data/floor",
            }
        ]
    },
    {
        title: "Booking",
        route: "/booking",
        icon: Package,
    },
    {
        title: "Calendar",
        route: "/calendar",
        icon: Calendar,
    },
    {
        title: "Setting",
        route: "/settings",
        icon: Settings,
    }
]

export const DesktopSidebar = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href={"/dashboard"}>
                        <Logo />
                    </Link>
                    <Notification />
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {
                            routes.map((route, index) => (
                                <SidebarItem
                                    title={route.title}
                                    route={route.route}
                                    icon={route.icon}
                                    child={route.items}
                                    key={index}
                                />
                            ))
                        }
                    </nav>
                </div>
                <div className="mt-auto p-4">
                   <BottomSidebar />
                </div>
            </div>
        </div>
    )
}