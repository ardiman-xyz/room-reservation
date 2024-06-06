"use client"

import {ReactNode} from "react";
import {useCurrentRole} from "@/hooks/use-current-role";
import FormError from "@/components/form-error";

const MasterLayout = ({children}: {children: ReactNode}) => {

    const userRole = useCurrentRole();

    return (
        <div>

            {
                userRole !== "ADMIN" ? (
                    <FormError message="Anda tidak memiliki akses halaman ini" />
                ): (
                    <main>{children}</main>

                )
            }

        </div>
    )
}

export default MasterLayout;