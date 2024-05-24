import React from "react";
import {Package2} from "lucide-react";

export const Logo = () => {
    return (
        <div className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6"/>
            <span className="">SIM Ruang</span>
        </div>
    )
}