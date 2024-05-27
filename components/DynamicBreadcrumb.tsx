"use client"

import {Fragment} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
    const router = usePathname();
    const paths = router.split("/").filter((path) => path !== "");

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    {
                        paths[0] === "dashboard" ? (
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        ):(
                        <BreadcrumbLink asChild>
                                    <Link href={"/dashboard"}>Dashboard</Link>
                        </BreadcrumbLink>
                        )
                    }
                </BreadcrumbItem>

                {paths.map((path, index) => {
                    if (path === "dashboard" && index === 0) {
                        return null;
                    }

                    return (
                        <Fragment key={path}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {index === paths.length - 1 ? (
                                    <BreadcrumbPage>{path}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={`/${paths.slice(0, index + 1).join("/")}`}>{path}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DynamicBreadcrumb;
