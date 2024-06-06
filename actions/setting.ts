"use server"

import {db} from "@/lib/db";
import {getData} from "@/data/setting";

export const saveWebName = async (name: string) => {
    if(!name) {
        return {error: "Input tidak valid"};
    }
    const existingSetting = await getData();

    try {
        if (existingSetting) {
            await db.siteSetting.update({
                where: { id: existingSetting.id },
                data: { name },
            });
            return { success: "Nama website berhasil diperbarui" };
        } else {
            await db.siteSetting.create({
                data: { name },
            });
            return { success: "Nama website berhasil disimpan" };
        }
    } catch (error) {
        console.error("Error saving or updating site setting:", error);
        return { error: "Terjadi kesalahan saat menyimpan data" };
    }
}

export const saveLogo = async (path: string) => {
    if(!path) {
        return {error: "Input tidak valid"};
    }
    const existingSetting = await getData();

    try {
        if (existingSetting) {
            await db.siteSetting.update({
                where: { id: existingSetting.id },
                data: { logo: path },
            });
            return { success: "Logo berhasil diperbarui" };
        } else {
            await db.siteSetting.create({
                data: { logo: path },
            });
            return { success: "Logo berhasil disimpan" };
        }
    } catch (error) {
        console.error("Error saving or updating site setting:", error);
        return { error: "Terjadi kesalahan saat menyimpan data" };
    }
}