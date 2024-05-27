import {LucideIcon} from "lucide-react";

export type Route = {
    title: string;
    route: string;
    icon: LucideIcon;
    child?: RouteChildren[]
}

export type RouteChildren = {
    title: string;
    route: string;
}