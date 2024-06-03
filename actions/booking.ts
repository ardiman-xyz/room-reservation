"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { BookingSchema } from "@/schemas";
import { getRoomById } from "@/data/room";
import {getBookingByDateTime, getBookingById} from "@/data/booking";

import { auth } from "@/auth";
import { differenceInDays } from "date-fns";
import {BookingLogStatus} from "@prisma/client";

export const create = async (values: z.infer<typeof BookingSchema>) => {
  const session = await auth();

  const validatedField = BookingSchema.safeParse(values);
  if (!validatedField.success) return { error: "Invalid fields" };

  const { date_start, time_start, date_end, time_end, roomId, purpose } =
    validatedField.data;

  const isRoomExist = await getRoomById(roomId);
  if (!isRoomExist) return { error: "Ruangan tidak ditemukan!" };

  const startDate = new Date(`${date_start}T${time_start}`);
  const endDate = new Date(`${date_end}T${time_end}`);

  const isBookingExist = await getBookingByDateTime(
    startDate,
    endDate,
    isRoomExist.id
  );

  if (isBookingExist)
    return {
      error:
        "Peminjaman gagal, kegiatan lain ada di waktu yang anda pilih!, silahkan cek di 'jadwal ruangan' diatas!",
    };

  if (!session?.user?.id) return { error: "Anauthorize" };

  const dateCount = differenceInDays(endDate, startDate) + 1;

  const newBooking = await db.booking.create({
    data: {
      userId: session.user.id,
      startDate,
      endDate,
      dateCount,
      purpose,
      roomId: isRoomExist.id,
    },
  });

  await db.bookingLog.create({
    data: {
      bookingId: newBooking.id,
    },
  });

  return { success: "Data peminjaman Berhasil di simpan" };
};


export const updateStatus = async (bookingId: string, status: BookingLogStatus, description: string) => {

    const isBookingExist = await getBookingById(bookingId);
    if(!isBookingExist) return { error: "Data tidak ditemukan" };

    if(!status) return {error: "Input status harus di isi!" };

    await db.bookingLog.create({
      data: {
        bookingId: bookingId,
        status,
        description
      }
    });

    return {success: "Status berhasil diubah"};
}