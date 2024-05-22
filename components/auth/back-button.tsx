"use client";

import Link from "next/link";

import {Button} from "@/components/ui/button";

interface BackButtonProps {
    label: string;
    href: string;
}

export const BackButton = ({label, href}: BackButtonProps) => {
    return (
        <Button variant="link">
            <Link href={href}>{label}</Link>
        </Button>
    )
}