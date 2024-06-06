"use client"

import Link from "next/link";
import React, {useState} from "react";
import { usePathname } from 'next/navigation'
import {ChevronRight} from "lucide-react";

import {Route} from "@/types/app";
import {useCurrentRole} from "@/hooks/use-current-role";

export const SidebarItem = ({title, route, icon: Icon, child, role}: Route) => {

    const userRole = useCurrentRole();
    const pathname = usePathname();
    const isActive = pathname.startsWith(route);

    const [isExpand, setIsExpand] = useState(isActive || false);
    const toggle = () => setIsExpand(!isExpand);

    const onExpanded = () => {
        toggle();
    }

    return(
       <>
           {
               userRole === role && (
                   <>
                       {

                           child && child.length > 0 ? (
                               <div>
                                   <div
                                       onClick={onExpanded}
                                       className={`flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-all relative cursor-pointer ${isExpand && "text-primary-light hover:text-primary-light"}` }
                                   >
                                       <ChevronRight
                                           className={`h-4 w-4 absolute top-2.5 -left-1 transition-all fill-black ${isExpand && "rotate-90 text-primary-light"}`}/>
                                       <Icon className="h-4 w-4"/>
                                       {title}
                                   </div>
                                   <ul
                                       className={`pl-11  overflow-hidden ${isExpand ? "max-h-screen py-1" : "max-h-0"}`}
                                   >
                                       {
                                           child.map(item => (
                                               <li key={item.route} className={`text-muted-foreground py-1 hover:text-primary-light ${isActive && "text-primary-light"}`}>
                                                   <Link href={item.route}>{item.title}</Link>
                                               </li>
                                           ))
                                       }
                                   </ul>
                               </div>
                           ) : (
                               <Link
                                   href={route}
                                   className={`flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-all ${
                                       isActive ? "text-primary-light" : "hover:text-primary-light"
                                   }`}
                               >
                                   <Icon className="h-4 w-4"/>
                                   {title}
                               </Link>
                           )
                       }
                   </>
               )
           }
       </>
    )
}