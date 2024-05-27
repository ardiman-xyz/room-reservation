import {db} from "@/lib/db";

export const getBuildingByName = async (name: string) => {
    try {
        return await db.building.findFirst({
            where: {name}
        })
    }catch {
        return null;
    }
}
