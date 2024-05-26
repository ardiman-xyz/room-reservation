"use client"

import Link from "next/link";
import {LucideIcon} from "lucide-react";
import React from "react";
import { usePathname } from 'next/navigation'

interface SidebarItemProps {
    title: string;
    route: string;
    icon: LucideIcon
}

export const SidebarItem = ({title, route, icon: Icon}: SidebarItemProps) => {

    const pathname = usePathname();

    const isActive = pathname.startsWith(route);

    return(
        <Link
            href={route}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all ${
                isActive ? "text-primary" : "hover:text-primary"
            }`}
        >
            <Icon className="h-4 w-4" />
            {title}
        </Link>
    )
}