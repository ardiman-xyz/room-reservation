"use server";

import { db } from "@/lib/db";

// export const getAllData = async () =>  {
//   const data = await db.booking.findMany({
//       orderBy: {
//           createdAt: "desc"
//       }
//   });
//   return data;
// }

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
            gte: endDate,
          },
        },
      ],
    },
  });

  return bookings.length > 0;
};
