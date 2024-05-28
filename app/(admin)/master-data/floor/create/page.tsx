
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {FloorForm} from "./_components/floor-form";
import {getAllData} from "@/data/building";

const CreateFloorPage = async () => {

    const data = await getAllData();

    return (
        <div>
            <Card className={"md:w-[500px] w-full border-none shadow-none"}>
                <CardHeader>
                    <CardTitle>Nama Lantai</CardTitle>
                    <CardDescription>
                        Masukkan nama lantai gedung.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FloorForm buildings={data} />
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateFloorPage;