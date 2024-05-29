import { db } from "@/lib/db";

export const getAllData = async () => {
  const data = await db.room.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Floor: {
        include: {
          building: true,
        },
      },
    },
  });
  return data;
};

export const getRoomByName = async (name: string) => {
  try {
    return await db.room.findFirst({
      where: { name },
    });
  } catch {
    return null;
  }
};

export const getRoomById = async (id: string) => {
  try {
    return await db.room.findUnique({
      where: { id },
    });
  } catch {
    return null;
  }
};
