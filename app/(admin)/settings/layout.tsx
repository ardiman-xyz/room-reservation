"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const LayoutSetting = ({children}: {children: React.ReactNode}) => {

    const pathname = usePathname();

    return (
        <div className={"container mx-auto max-w-7xl"}>
            <h1 className="font-semibold text-2xl">Pengaturan</h1>
            <div className="flex lg:flex-row flex-col lg:gap-x-4 gap-x-0 mt-8">
                <div className="lg:w-[252px] w-full">
                    <div
                        className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav
                            className="grid text-sm text-muted-foreground"
                        >
                            <Link href={'/settings/general'} className={cn("hover:bg-gray-100 p-2", pathname === "/settings/general" && "bg-gray-100 font-bold text-black")}>
                                Umum
                            </Link>
                            <Link href={'/settings/account'} className={cn("hover:bg-gray-100 p-2", pathname === "/settings/account" && "bg-gray-100 font-bold text-black")}>Akun</Link>
                        </nav>
                    </div>
                </div>
                <main className="w-full">{children}</main>
            </div>
        </div>
    )
}

export default LayoutSetting