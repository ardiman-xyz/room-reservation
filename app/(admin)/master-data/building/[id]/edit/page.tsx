import {getBuildingById} from "@/data/building";

import {Building} from "@prisma/client";

import { EditBuildingForm } from "./_components/edit-form"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const BuildingEditPage =  async ({params}: {params: {id: string}}) => {

    const data = await getBuildingById(params.id) as Building;

    return (
        <div>
            <Card className={"md:w-[500px] w-full border-none shadow-none"}>
                <CardHeader>
                    <CardTitle>Nama Gedung</CardTitle>
                    <CardDescription>
                        Edit nama gedung anda dengan data yang benar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <EditBuildingForm defaultData={data} />
                </CardContent>
            </Card>
        </div>
    )
}

export default BuildingEditPage;