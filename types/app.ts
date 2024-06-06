import { LucideIcon } from "lucide-react";
import {
  Room,
  Floor,
  Building,
  Booking,
  User,
  BookingLog,
  UserRole,
} from "@prisma/client";

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
  role: UserRole
};

export type RouteChildren = {
  title: string;
  route: string;
};

export type BookingWithRelations = Booking & {
  user: User;
  room: RoomWithFloor;
  BookingLog: BookingLog[];
};

