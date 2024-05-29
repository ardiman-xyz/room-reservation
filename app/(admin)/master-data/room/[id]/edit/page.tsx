import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {getFloorById} from "@/data/floor";
import {FloorEditForm} from "@/app/(admin)/master-data/floor/[id]/edit/_components/floor-edit-form";
import {getAllData} from "@/data/building";

const FloorEditPage = async ({params}: {params: {id: string}}) => {

    const floor = await getFloorById(params.id);
    const buildings = await getAllData();

    if(!floor) return null;

    return (
        <div>
            <Card className={"md:w-[600px] w-full border-none shadow-none"}>
                <CardHeader>
                    <CardTitle>Nama Lantai</CardTitle>
                    <CardDescription>
                        Masukkan nama lantai gedung.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FloorEditForm
                        buildings={buildings}
                        defaultData={floor}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default FloorEditPage;