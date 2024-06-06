import {db} from "@/lib/db";

export const getUserByEmail = async (email: string, excludeId?: string) => {
    try {
        return await db.user.findFirst({
            where: {
                email: {
                    equals: email,
                },
                NOT: {
                    id: excludeId,
                },
            },
        })
    }catch {
        return null;
    }
}

export const getUserById = async (id: string | undefined) => {
    try {
        return await db.user.findUnique({
            where: {id}
        })
    }catch {
        return null;
    }
}
