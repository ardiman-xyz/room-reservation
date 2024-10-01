import { getDashboardData } from "@/actions/dashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Calendar, ChevronDown, Home, PieChart, Users } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
  const data = await getDashboardData();

  console.info(data);

  const rooms = [
    {
      id: 1,
      name: "Ruang Telekonference E101",
      status: "Available",
      bookings: 3,
      capacity: 100,
    },
    {
      id: 2,
      name: "Ruang Rapat A202",
      status: "Booked",
      bookings: 5,
      capacity: 20,
    },
    {
      id: 3,
      name: "Auditorium",
      status: "Maintenance",
      bookings: 0,
      capacity: 500,
    },
    {
      id: 4,
      name: "Ruang Seminar B303",
      status: "Available",
      bookings: 2,
      capacity: 50,
    },
  ];

  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Ruangan
                </CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalRooms}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +2 sejak bulan lalu
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ruangan Tersedia
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {rooms.filter((room) => room.status === "Available").length}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  -1 sejak kemarin
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pemesanan
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalBookings}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +20% dari minggu lalu
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tingkat Hunian
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.occupancyRate}%</div>
                <Progress value={data.occupancyRate} className="mt-2" />
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Status Ruangan</CardTitle>
                <CardDescription>
                  Gambaran status semua ruangan saat ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{room.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Kapasitas: {room.capacity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            room.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : room.status === "Booked"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {room.status}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              {room.status === "Booked" ? (
                                ""
                              ) : (
                                <Link
                                  href={`/booking/create/${room.id}/confirmation`}
                                >
                                  Pemesanan Cepat
                                </Link>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
