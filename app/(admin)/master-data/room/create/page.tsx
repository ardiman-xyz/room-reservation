import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {RoomFormContainer} from "./_components/room-form-container";
import {getAllData as getAllBuilding} from "@/data/building";

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
                    <RoomFormContainer buildings={buildings}  />
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateFloorPage;