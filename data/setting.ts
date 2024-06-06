"use server";

import {db} from "@/lib/db";

export const getData = async () => {
    try {
        return db.siteSetting.findFirst();
    }catch {
        return null;
    }
}