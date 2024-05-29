import { LucideIcon } from "lucide-react";
import { Room, Floor, Building } from "@prisma/client";

export type FloorWithBuilding = Floor & {
  building: Building;
};
export type RoomWithFloor = Room & {
  Floor: FloorWithBuilding;
};

export type FloorWithRooms = Floor & {
  rooms: Room[];
};

export type Route = {
  title: string;
  route: string;
  icon: LucideIcon;
  child?: RouteChildren[];
};

export type RouteChildren = {
  title: string;
  route: string;
};
