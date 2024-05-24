import React from "react";
import Link from "next/link";
import {Bell, Home, Laptop, LineChart, Package, Package2, ShoppingCart, Users} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {Logo} from "@/components/logo";
import {Notification} from "@/app/(admin)/_components/notification";
import {BottomSidebar} from "@/app/(admin)/_components/bottom-sidebar";

const routes = [
    {
        title: "Dashboard",
        route: "/dashboard",
    },
    {
        title: "Master data",
        route: "/master",
    },
    {
        title: "Booking",
        route: "/booking",
    },
    {
        title: "Calendar",
        route: "/calendar",
    },
    {
        title: "Setting",
        route: "/setting",
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
                        <Link
                            href={"/dashboard"}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Home className="h-4 w-4"/>
                            Dashboard
                        </Link>
                        <Link
                            href={"/data"}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Laptop className="h-4 w-4"/>
                            Master data
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <ShoppingCart className="h-4 w-4"/>
                            Orders
                            <Badge
                                className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                            <Package className="h-4 w-4"/>
                            Products{" "}
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Users className="h-4 w-4"/>
                            Customers
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <LineChart className="h-4 w-4"/>
                            Analytics
                        </Link>
                    </nav>
                </div>
                <div className="mt-auto p-4">
                   <BottomSidebar />
                </div>
            </div>
        </div>
    )
}