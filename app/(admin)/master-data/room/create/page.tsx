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
        <div className="md:w-2/5 w-full"></div>
      </div>
    </div>
  );
};

export default CreateFloorPage;
