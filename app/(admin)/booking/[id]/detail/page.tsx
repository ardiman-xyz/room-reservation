import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookingById } from "@/data/booking";
import { format } from "date-fns";
import { Calendar, Clock, Monitor, Users, Wifi } from "lucide-react";

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const booking = await getBookingById(params.id);

  if (!booking) return null;

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Booking Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Booking ID: {booking.id}
            </p>
          </div>
          <Badge variant="outline">
            {new Date() < booking.startDate
              ? "Upcoming"
              : new Date() > booking.endDate
              ? "Completed"
              : "In Progress"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={booking.room.imagePath}
            alt={booking.room.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Room Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">{booking.room.name}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">Capacity: {booking.room.capacity}</span>
            </div>
            <div className="flex items-center md:col-span-2">
              <span className="text-sm font-medium mr-2">Facilities:</span>
              <div className="flex items-center">
                <Wifi className="mr-1 h-4 w-4" />
                <Monitor className="mr-1 h-4 w-4" />
                <span className="text-sm">{booking.room.facilities}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Booking Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {format(booking.startDate, "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {format(booking.startDate, "HH:mm")} -{" "}
                {format(booking.endDate, "HH:mm")}
              </span>
            </div>
            <div className="flex items-center md:col-span-2">
              <span className="text-sm font-medium mr-2">Purpose:</span>
              <span className="text-sm">{booking.purpose}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Booked By</h3>

          {booking.user && (
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={booking.user.image ?? ""}
                  alt={`${booking.user.name}`}
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{booking.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailPage;
