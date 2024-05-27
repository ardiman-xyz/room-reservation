"use server";

import * as z from "zod";

import {db} from "@/lib/db";

import {formCreate} from "@/schemas/building";
import {getBuildingById, getBuildingByName} from "@/data/building";

export const create = async (values: z.infer<typeof formCreate>) => {
    const validatedField = formCreate.safeParse(values);

    if(!validatedField.success) return {error: "Invalid field"};

    const { name } = validatedField.data;

    const isNameExist = await getBuildingByName(name);
    if(isNameExist) return {error: "Nama gedung sudah ada!"};

     await db.building.create({
         data: {name}
     })

    return {success: "Gedung berhasil disimpan"};

}

export const update = async (values: z.infer<typeof formCreate>, id: string) => {
    const validatedField = formCreate.safeParse(values);

    if(!validatedField.success) return {error: "Invalid field"};

    const existingBuilding = await getBuildingById(id);
    if(!existingBuilding) return {error: "Gedung tidak ditemukan!"};

    const { name } = validatedField.data;

    const isNameExist = await getBuildingByName(name);
    if(isNameExist) return {error: "Nama gedung sudah ada!"};

    await db.building.update({
        where: {id: existingBuilding.id},
        data: {
            name
        }
    })

    return {success: "Gedung berhasil diupdate"};
}
