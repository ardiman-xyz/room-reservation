import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoomFormContainer } from "./_components/room-form-container";
import { getAllData as getAllBuilding } from "@/data/building";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ImagePlus } from "lucide-react";

const CreateFloorPage = async () => {
  const buildings = await getAllBuilding();

  return (
    <div className="w-full container mx-auto ">
      <div className="flex items-center gap-4 mb-10">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Pro Controller
        </h1>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
      <div className="flex gap-8 lg:flex-row flex-col">
        <div className={"md:w-3/5 w-ful flex flex-col gap-y-6"}>
          <Card>
            <CardHeader>
              <CardTitle>Lokasi</CardTitle>
              <CardDescription>Sesuaikan lokasi ruangan.</CardDescription>
            </CardHeader>
            <CardContent>
              <RoomFormContainer buildings={buildings} />
            </CardContent>
          </Card>
        </div>
        <div className="md:w-2/5 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Gambar</CardTitle>
              <CardDescription>Uplod beberapa gambar ruangan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <h1 className="text-sm font-semibold text-muted-foreground">
                  Cover
                </h1>

                <div className="w-[300px] h-[247px] bg-gray-100 rounded mt-2 flex justify-center items-center">
                  <ImagePlus className="text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateFloorPage;
