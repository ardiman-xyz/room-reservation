import React from "react";
import {Package2} from "lucide-react";

import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6"/>
            <span className="">SIM Ruang</span>
        </Link>
    )
}