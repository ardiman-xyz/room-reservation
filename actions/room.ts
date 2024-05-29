"use server";

import * as z from "zod";

import { RoomSchema } from "@/schemas";
import { db } from "@/lib/db";

import { getBuildingById } from "@/data/building";
import { getRoomById } from "@/data/room";
import { getFloorById } from "@/data/floor";

export const create = async (values: z.infer<typeof RoomSchema>) => {
  const validatedFields = RoomSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Input tidak valid!" };

  const { building, floor, name } = validatedFields.data;

  const isBuildingExist = await getBuildingById(building);
  if (!isBuildingExist) return { error: "Gedung tidak ditemukan!" };

  const isFloorExist = await getFloorById(floor);
  if (!isFloorExist) return { error: "Lantai tidak ditemukan!" };

  const existingRoom = await db.room.findFirst({
    where: {
      floorId: isFloorExist.id,
      name: name,
    },
  });

  if (existingRoom)
    return {
      error: `Ruanga ${name} yang sama sudah ada di lantai ${isFloorExist.name}!`,
    };

  await db.room.create({
    data: {
      floorId: isFloorExist.id,
      name,
    },
  });

  return {
    success:
      "Berhasil menambahkan lantai di ruagan " +
      name +
      " di lantai " +
      isFloorExist.name,
  };
};
//
// export const updateFloor = async (values: z.infer<typeof FloorSchema>, id: string) => {
//     const validatedFields = FloorSchema.safeParse(values);
//     if(!validatedFields.success) return {error: "Invalid field"};
//
//     const { building, name } = validatedFields.data;
//
//     const isBuildingExist = await getBuildingById(building);
//     if(!isBuildingExist) return {error: "Gedung tidak ditemukan!"};
//
//
//     const existingFloorBuilding = await db.floor.findFirst({
//         where: {
//             buildingId: isBuildingExist.id,
//             name: name,
//         },
//     });
//
//     if (existingFloorBuilding) return { error: `Lantai dengan ${name} yang sama sudah ada di gedung ${isBuildingExist.name}!` };
//
//     const existingFloor = await getFloorById(id)
//
//     if(!existingFloor) return {error: "Data lantai tidak ada!"};
//
//     await db.floor.update({
//         where: {id: existingFloor.id},
//         data: {
//             buildingId: isBuildingExist.id,
//             name,
//         }
//     });
//
//     return {success: "Data lantai berhasil di update"};
//
// }
//

export const deleteRoom = async (id: string) => {
  const isRoomExist = await getRoomById(id);
  if (!isRoomExist) return { error: "Data ruangan tidak ada!" };

  await db.room.delete({
    where: { id },
  });

  return { success: "Data runagan berhasil di hapus" };
};
