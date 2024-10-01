"use server";

import { db } from "@/lib/db";

export const getAllData = async () => {
  const data = await db.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      room: {
        include: {
          Floor: {
            include: {
              building: true,
            },
          },
        },
      },
      user: true,
      BookingLog: true,
    },
  });

  return data;
};

export const getAllDataByUserId = async (userId: string) => {
  const data = await db.booking.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      room: {
        include: {
          Floor: {
            include: {
              building: true,
            },
          },
        },
      },
      user: true,
      BookingLog: true,
    },
  });

  return data;
};

export const getAllDataWithApprovedLogs = async () => {
  const data = await db.booking.findMany({
    where: {
      BookingLog: {
        some: {
          status: "APPROVED",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      room: {
        include: {
          Floor: {
            include: {
              building: true,
            },
          },
        },
      },
      user: true,
      BookingLog: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  return data.filter((booking) => {
    const latestLog = booking.BookingLog[0];
    return latestLog && latestLog.status === "APPROVED";
  });
};

export const getBookingByDateTime = async (
  startDate: Date,
  endDate: Date,
  roomId: string
): Promise<boolean> => {
  const bookings = await db.booking.findMany({
    where: {
      roomId: roomId,
      OR: [
        {
          startDate: {
            lte: startDate,
          },
          endDate: {
            gte: startDate,
          },
        },
        {
          startDate: {
            lte: endDate,
          },
          endDate: {
            gte: endDate,
          },
        },
        {
          startDate: {
            gte: startDate,
          },
          endDate: {
            lte: endDate,
          },
        },
      ],
    },
  });

  return bookings.length > 0;
};

export const getBookingByDateTimeExcludingId = async (
  startDate: Date,
  endDate: Date,
  roomId: string,
  excludeBookingId: string
) => {
  return db.booking.findFirst({
    where: {
      roomId,
      id: { not: excludeBookingId },
      OR: [
        {
          startDate: { lte: endDate },
          endDate: { gte: startDate },
        },
      ],
    },
  });
};

export const getBookingById = async (id: string) => {
  return db.booking.findFirst({
    where: { id },
    include: {
      room: true,
      user: true,
    },
  });
};
