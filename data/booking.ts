"use server";

import { db } from "@/lib/db";

export const getBookingByDateTime = async (
  startDateTime: Date,
  endDateTime: Date,
  roomId: string
) => {
  const bookings = await db.booking.findMany({
    where: {
      roomId,
      AND: [
        {
          startDate: startDateTime,
          endDate: endDateTime,
        },
      ],
    },
  });

  return bookings.some(
    (booking) =>
      (startDateTime >= booking.startDate && startDateTime < booking.endDate) ||
      (endDateTime > booking.startDate && endDateTime <= booking.endDate) ||
      (startDateTime <= booking.startDate && endDateTime >= booking.endDate)
  );
};
