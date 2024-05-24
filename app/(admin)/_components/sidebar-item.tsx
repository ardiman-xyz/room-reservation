import Link from "next/link";
import {Home} from "lucide-react";
import React from "react";

interface SidebarItemProps {
    title: string;
    route: string;
}

export const SidebarItem = ({title, route}: SidebarItemProps) => {
    return(
        <Link
            href={route}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
            <Home className="h-4 w-4"/>
            {title}
        </Link>
    )
}