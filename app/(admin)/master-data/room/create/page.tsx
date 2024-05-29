import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {RoomForm} from "./_components/room-form";
import {getAllData as getAllBuilding} from "@/data/building";

import {getAllByBuildingId} from "@/data/floor";

const CreateFloorPage = async () => {

    const buildings = await getAllBuilding();


    return (
        <div>
            <Card className={"md:w-[600px] w-full border-none shadow-none"}>
                <CardHeader>
                    <CardTitle>Ruangan</CardTitle>
                    <CardDescription>
                        Masukkan nama ruangan lantai.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RoomForm buildings={buildings}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateFloorPage;