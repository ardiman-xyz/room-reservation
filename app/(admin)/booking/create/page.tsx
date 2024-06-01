import React from "react";

import { getAllData } from "@/data/room";

import { SearchBookingRoom } from "./_components/search";
import RoomItem from "./_components/room-item";

const CreateBookingPage = async () => {
  const rooms = await getAllData();

  return (
    <div>
      <div className="w-full mb-8 mt-4">
        <SearchBookingRoom />
      </div>
      <div className="flex flex-col gap-y-6">
        {rooms.map((room) => (
          <RoomItem key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default CreateBookingPage;
