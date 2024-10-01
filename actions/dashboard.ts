import { db } from "@/lib/db";

export async function getDashboardData() {
  // Mengambil total ruangan
  const totalRooms = await db.room.count();

  // Mengambil ruangan yang tersedia (tidak ada booking aktif)
  const availableRooms = await db.room.count({
    where: {
      booking: {
        none: {
          OR: [
            {
              startDate: { lte: new Date() },
              endDate: { gte: new Date() },
            },
          ],
        },
      },
    },
  });

  // Mengambil total pemesanan
  const totalBookings = await db.booking.count();

  // Menghitung tingkat hunian
  const occupancyRate = Math.round(
    ((await db.booking.count({
      where: {
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
    })) /
      totalRooms) *
      100
  );

  // Mengambil data ruangan dengan status terkini
  const rooms = await db.room.findMany({
    include: {
      Floor: {
        include: {
          building: true,
        },
      },
      booking: {
        where: {
          OR: [
            {
              startDate: { lte: new Date() },
              endDate: { gte: new Date() },
            },
          ],
        },
      },
    },
  });

  const roomsWithStatus = rooms.map((room) => ({
    id: room.id,
    name: room.name,
    capacity: room.capacity,
    status: room.booking.length > 0 ? "Booked" : "Available",
    bookings: room.booking.length,
  }));

  return {
    totalRooms,
    availableRooms,
    totalBookings,
    occupancyRate,
    rooms: roomsWithStatus,
  };
}
