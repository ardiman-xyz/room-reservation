"use client";

import React from "react";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import {BackButton} from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const CardWrapper = ({children, backButtonHref, backButtonLabel, headerLabel, showSocial = false}: CardWrapperProps) => {
    return (
        <Card className="w-[440px] shadow-md ">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}

export default CardWrapper;