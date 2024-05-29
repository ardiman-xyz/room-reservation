import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllData as getAllBuilding } from "@/data/building";

const RoomEditPage = async ({ params }: { params: { id: string } }) => {
  //   const room = await getAllByBuildingId();

  return (
    <div>
      <Card className={"md:w-[600px] w-full border-none shadow-none"}>
        <CardHeader>
          <CardTitle>Ruangan</CardTitle>
          <CardDescription>Atur ruangan anda dengan benar.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <FloorEditForm buildings={buildings} defaultData={floor} /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomEditPage;
