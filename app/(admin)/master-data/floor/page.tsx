import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {columns} from "@/app/(admin)/master-data/floor/column";
import {DataTable} from "@/app/(admin)/master-data/floor/data-datable";
import {getAllData} from "@/data/floor";

const FloorPage = async () => {

    const floor = await getAllData();

    return (
        <div className="">
            <div className="flex justify-end items-center gap-2 mb-2">
                <Link href={"/master-data/floor/create"}>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5"/>
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Lantai gedung
                        </span>
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Lantai Gedung</CardTitle>
                    <CardDescription>
                        Atur data lantai untuk gedung anda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={floor} />
                </CardContent>
            </Card>
        </div>
    )
}

export default FloorPage;