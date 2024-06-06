"use client"

import {useCurrentUser} from "@/hooks/use-current-user";

const DashboardPage = () => {

    const user = useCurrentUser();

    return (
        <div>
            dashboard page {JSON.stringify(user)}
        </div>
    )
}

export default DashboardPage;