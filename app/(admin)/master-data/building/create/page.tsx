import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {BuildingForm} from "./_components/building-form";

const BuildingPageCreate = () => {
    return (
        <div>
            <Card className={"md:w-[500px] w-full border-none shadow-none"}>
                <CardHeader>
                    <CardTitle>Nama Gedung</CardTitle>
                    <CardDescription>
                        Masukkan nama gedung anda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <BuildingForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default BuildingPageCreate;