"use server";

import * as z from "zod";

import {FloorSchema} from "@/schemas";
import {db} from "@/lib/db";

import {getBuildingById} from "@/data/building";
import {getFloorByName} from "@/data/floor";

export const create = async (values: z.infer<typeof FloorSchema>) => {
    const validatedFields = FloorSchema.safeParse(values);
    if(!validatedFields.success) return {error: "Input tidak valid!"};

    const { building, name } = validatedFields.data;

    const isBuildingExist = await getBuildingById(building);
    if(!isBuildingExist) return {error: "Gedung tidak ditemukan!"};

    await db.floor.create({
        data: {
            buildingId: isBuildingExist.id,
            name
        }
    });

    return {success: "Berhasil menambahkan lantai di gedung " + isBuildingExist.name};
}