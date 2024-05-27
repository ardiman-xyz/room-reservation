import {db} from "@/lib/db";

export const getAllData = async () =>  {
    const data = await db.building.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return data;
}

export const getBuildingByName = async (name: string) => {
    try {
        return await db.building.findFirst({
            where: {name}
        })
    }catch {
        return null;
    }
}

export const getBuildingById = async (id: string) => {
    try {
        return await db.building.findUnique({
            where: {id}
        })
    }catch {
        return null;
    }
}