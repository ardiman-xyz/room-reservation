"use client";

import React from "react";
import Link from "next/link";
import { Home, Laptop, Calendar, Settings, Container } from "lucide-react";

import { Logo } from "@/components/logo";
import { Notification } from "@/app/(admin)/_components/notification";
import { BottomSidebar } from "@/app/(admin)/_components/bottom-sidebar";
import { SidebarItem } from "@/app/(admin)/_components/sidebar-item";

export const routes = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: Home,
    roles: ["ADMIN", "USER"],
  },
  {
    title: "Master data",
    route: "/master-data",
    icon: Laptop,
    roles: ["ADMIN"],
    items: [
      {
        title: "Gedung",
        route: "/master-data/building",
      },
      {
        title: "Lantai",
        route: "/master-data/floor",
      },
      {
        title: "Ruangan",
        route: "/master-data/room",
      },
    ],
  },
  {
    title: "Peminjaman",
    route: "/booking",
    icon: Container,
    roles: ["ADMIN", "USER"],
  },
  {
    title: "Kalender",
    route: "/calendar",
    icon: Calendar,
    roles: ["ADMIN", "USER"],
  },
  {
    title: "Pengaturan",
    route: "/settings/general",
    icon: Settings,
    roles: ["ADMIN"],
  },
];

export const DesktopSidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={"/dashboard"}>
            <Logo withTitle />
          </Link>
          <Notification />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {routes.map((route, index) => (
              <SidebarItem
                title={route.title}
                route={route.route}
                icon={route.icon}
                child={route.items}
                roles={route.roles as string[]}
                key={index}
              />
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <BottomSidebar />
        </div>
      </div>
    </div>
  );
};
