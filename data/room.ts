import { db } from "@/lib/db";

import { startOfDay, endOfDay, isWithinInterval, format } from "date-fns";
// import { zonedTimeToUtc } from 'date-fns-tz';

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
      include: {
        Floor: {
          include: {
            building: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};

export const getRoomByIdAndStatus = async (id: string) => {
  try {
    const room = await db.room.findUnique({
      where: { id },
      include: {
        Floor: {
          include: {
            building: true,
          },
        },
      },
    });

    if (!room) {
      return {
        status: "not found",
        statusText: "Ruangan tidak ditemukan",
        room: null,
      };
    }

    const now = new Date();
    const startOfDayUtc = startOfDay(now);
    const endOfDayUtc = endOfDay(now);

    const bookings = await db.booking.findMany({
      where: {
        roomId: id,
        OR: [
          {
            startDate: {
              gte: startOfDayUtc,
              lte: endOfDayUtc,
            },
          },
          {
            endDate: {
              gte: startOfDayUtc,
              lte: endOfDayUtc,
            },
          },
        ],
      },
      orderBy: {
        startDate: "asc",
      },
    });

    let status = true;
    let statusText = "Ruangan Tersedia hari ini";

    if (bookings.length > 0) {
      const currentBooking = bookings.find(
        (booking) => booking.startDate <= now && booking.endDate >= now
      );

      if (currentBooking) {
        status = false;
        statusText = "Ruangan sedang ada kegiatan saat ini";
      } else {
        const nextBooking = bookings.find((booking) => booking.startDate > now);
        if (nextBooking) {
          const startTime = nextBooking.startDate;
          status = true;
          statusText = `Tersedia sampai pukul ${format(startTime, "HH:mm")}`;
        }
      }
    }

    return { status, statusText, room };
  } catch (error) {
    console.error("Error in getRoomByIdAndStatus:", error);
    return {
      status: "error",
      statusText: "Terjadi kesalahan saat mengambil data ruangan",
      room: null,
    };
  }
};
