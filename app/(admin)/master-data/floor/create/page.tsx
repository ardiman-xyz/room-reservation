
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

const CreateFloorPage = () => {
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
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateFloorPage;