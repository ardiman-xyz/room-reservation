import Link from "next/link";
import {PlusCircle} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { getAllData } from "@/data/building"
import {DataTable} from "@/app/(admin)/master-data/building/data-datable";
import {columns} from "@/app/(admin)/master-data/building/column";

const BuildingPage = async () => {

    const buildings = await getAllData();

    return (
        <div className="">
            <div className="flex justify-end items-center gap-2 mb-2">
               <Link href={"/master-data/building/create"} >
                   <Button size="sm" className="h-8 gap-1">
                       <PlusCircle className="h-3.5 w-3.5"/>
                       <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                   Tambah Gedung
                  </span>
                   </Button>
               </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Gedung</CardTitle>
                    <CardDescription>
                        Atur data gedung anda
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={buildings} />
                </CardContent>
            </Card>
        </div>
    )
}

export default BuildingPage;