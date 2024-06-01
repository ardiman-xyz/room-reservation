import React from "react";
import { Info, Megaphone, Users, Wifi } from "lucide-react";

import { Hint } from "@/components/ui/Hint";
import { Badge } from "@/components/ui/badge";
import { Room } from "@prisma/client";
import { RoomWithFloor } from "@/types/app";
import Image from "next/image";
import Link from "next/link";

interface RoomItemProps {
  room: RoomWithFloor;
}

const RoomItem = ({ room }: RoomItemProps) => {
  return (
    <Link href={`/booking/create/${room.id}/confirmation`}>
      <div className="w-full rounded-lg p-4 bg-white flex gap-x-4 cursor-pointer border hover:shadow-md transition-all hover:shadow-gray-200">
        <Image src={room.imagePath} alt="Cover room" width={200} height={200} />
        <div className="ml-4 w-full flex flex-col justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              {room.Floor.building.name}, {room.Floor.name}
            </p>
            <h3 className="text-lg font-semibold">{room.name}</h3>
            <div className="mt-4 flex items-center gap-x-2">
              <Hint description="Fasilitas" side="top" sideOffset={2}>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </Hint>
              <p className="text-muted-foreground text-sm ">
                {room.facilities}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-x-2">
              <Hint description="Kapaisitas" side="top" sideOffset={2}>
                <Users className="h-4 w-4 text-muted-foreground" />
              </Hint>
              <p className="text-muted-foreground text-sm ">
                {room.capacity} Orang
              </p>
            </div>
            <div className="mt-2 flex items-center gap-x-2">
              <Hint description="Status" side="top" sideOffset={2}>
                <Megaphone className="h-4 w-4 text-muted-foreground" />
              </Hint>
              <Badge className="text-xs rounded-sm bg-green-200 text-green-700 px-1.5 py-0.5 hover:bg-green-200">
                Tersedia
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomItem;
