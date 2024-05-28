import {db} from "@/lib/db";

export const getAllData = async () =>  {
    const data = await db.floor.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            building: true
        }
    });
    return data;
}

export const getFloorByName = async (name: string) => {
    try {
        return await db.floor.findFirst({
            where: {name}
        })
    }catch {
        return null;
    }
}

export const getFloorById = async (id: string) => {
    try {
        return await db.floor.findUnique({
            where: {id}
        })
    }catch {
        return null;
    }
}