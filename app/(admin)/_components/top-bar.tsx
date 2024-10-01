import React from "react";

import { MobileSidebar } from "./mobile-sidebar";
import { SearchTopBarForm } from "@/app/(admin)/_components/search-topbar-form";
import { UserButton } from "@/app/(admin)/_components/user-button";

export const TopBar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileSidebar />
      <div className="w-full flex-1">{/* <SearchTopBarForm /> */}</div>
      <UserButton />
    </header>
  );
};
