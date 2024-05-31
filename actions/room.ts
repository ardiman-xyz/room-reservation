"use server";

import * as z from "zod";

import { RoomSchema } from "@/schemas";
import { db } from "@/lib/db";

import { getBuildingById } from "@/data/building";
import { getRoomById } from "@/data/room";
import { getFloorById } from "@/data/floor";

export const create = async (
  values: z.infer<typeof RoomSchema>,
  imagePath: string
) => {
  const validatedFields = RoomSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Input tidak valid!" };

  if (imagePath === "" || imagePath === null)
    return { error: "Gambar harus di isi!" };

  const { building, floor, name, capacity, facility } = validatedFields.data;

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
      error: `Ruangan ${name} yang sama sudah ada di lantai ${isFloorExist.name}!`,
    };

  await db.room.create({
    data: {
      floorId: isFloorExist.id,
      name,
      capacity: Number(capacity),
      facilities: facility as string,
      imagePath,
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

export const deleteRoom = async (id: string) => {
  const isRoomExist = await getRoomById(id);
  if (!isRoomExist) return { error: "Data ruangan tidak ada!" };

  await db.room.delete({
    where: { id },
  });

  return { success: "Data runagan berhasil di hapus" };
};
