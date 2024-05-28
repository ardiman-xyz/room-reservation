"use server";

import * as z from "zod";

import {FloorSchema} from "@/schemas";
import {db} from "@/lib/db";

import {getBuildingById} from "@/data/building";
import {getFloorById} from "@/data/floor";

export const create = async (values: z.infer<typeof FloorSchema>) => {
    const validatedFields = FloorSchema.safeParse(values);
    if(!validatedFields.success) return {error: "Input tidak valid!"};

    const { building, name } = validatedFields.data;

    const isBuildingExist = await getBuildingById(building);
    if(!isBuildingExist) return {error: "Gedung tidak ditemukan!"};

    const existingFloor = await db.floor.findFirst({
        where: {
            buildingId: isBuildingExist.id,
            name: name,
        },
    });

    if (existingFloor) return { error: `Lantai dengan ${name} yang sama sudah ada di gedung ${isBuildingExist.name}!` };

    await db.floor.create({
        data: {
            buildingId: isBuildingExist.id,
            name
        }
    });

    return {success: "Berhasil menambahkan lantai di gedung " + isBuildingExist.name};
}

export const updateFloor = async (values: z.infer<typeof FloorSchema>, id: string) => {
    const validatedFields = FloorSchema.safeParse(values);
    if(!validatedFields.success) return {error: "Invalid field"};

    const { building, name } = validatedFields.data;

    const isBuildingExist = await getBuildingById(building);
    if(!isBuildingExist) return {error: "Gedung tidak ditemukan!"};


    const existingFloorBuilding = await db.floor.findFirst({
        where: {
            buildingId: isBuildingExist.id,
            name: name,
        },
    });

    if (existingFloorBuilding) return { error: `Lantai dengan ${name} yang sama sudah ada di gedung ${isBuildingExist.name}!` };

    const existingFloor = await getFloorById(id)

    if(!existingFloor) return {error: "Data lantai tidak ada!"};

    await db.floor.update({
        where: {id: existingFloor.id},
        data: {
            buildingId: isBuildingExist.id,
            name,
        }
    });

    return {success: "Data lantai berhasil di update"};

}

export const deleteFloor = async (id: string) => {

    const isFloorExisting = await getFloorById(id);
    if(!isFloorExisting) return {error: "Data lantai tidak ada!"};

    await db.floor.delete({
        where: {id},
        include: {
            room: true
        }
    });

    return {success: "Data lantai berhasil di hapus"};

}