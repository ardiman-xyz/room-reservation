"use server";

import { db } from "@/lib/db";

export const getAllData = async () => {
  const data = await db.floor.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      building: true,
    },
  });
  return data;
};

export const getFloorByName = async (name: string) => {
  try {
    return await db.floor.findFirst({
      where: { name },
    });
  } catch {
    return null;
  }
};

export const getFloorById = async (id: string) => {
  try {
    return await db.floor.findUnique({
      where: { id },
    });
  } catch {
    return null;
  }
};

export const getAllByBuildingId = async (buildingId: string) => {
  try {
    return await db.floor.findMany({
      where: { buildingId },
      include: {
        building: true,
      },
    });
  } catch (error) {
    console.error("Error fetching floors:", error);
    return null;
  }
};
