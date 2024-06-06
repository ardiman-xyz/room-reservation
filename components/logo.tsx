import React, {useEffect, useState} from "react";

import { getData } from "@/data/setting"
import {SiteSetting} from "@prisma/client";
import Image from "next/image";

interface LogoProps {
    width?: number;
    height?: number;
    withTitle? : boolean
}

export const Logo = ({width = 50, height = 39, withTitle = false}: LogoProps) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<SiteSetting | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                setData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={`flex items-center ${!withTitle ? "gap-2" : "gap-0"} font-semibold`}>
            {
                data?.name ? (
                  <Image src={data?.logo || "next.svg"} alt={"name"} width={width} height={height} />
                ):(
                    <div>
                        tidak ada logo
                    </div>
                )
            }
            {
                withTitle && <span className="ml-2">{data?.name || "Web Name"}</span>
            }
        </div>
    )
}