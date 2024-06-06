import * as z from "zod";

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters long",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email tidak valid",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email tidak valid",
  }),
  password: z.string().min(2, {
    message: "Password harus di isi",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email not valid",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters long",
  }),
  name: z.string().min(1, {
    message: "name is required",
  }),
});

export const FloorSchema = z.object({
  building: z.string().min(1, {
    message: "Gedung harus di isi",
  }),
  name: z.string().min(2, {
    message: "Name is required",
  }),
});

export const RoomSchema = z.object({
  building: z.string().min(1, {
    message: "Gedung harus di isi",
  }),
  floor: z.string().min(1, {
    message: "Lantai harus di isi",
  }),
  name: z.string().min(2, {
    message: "Name is required",
  }),
  capacity: z.string().optional(),
  facility: z.string().optional(),
});

export const BookingSchema = z.object({
  roomId: z.string().min(1, {
    message: "Ruangan harus di isi",
  }),
  date_start: z.string().min(1, {
    message: "Tanggal mulai harus di isi",
  }),
  time_start: z.string().min(1, {
    message: "Waktu mulai harus di isi",
  }),
  date_end: z.string().min(2, {
    message: "Tanggal berakhir harus di isi",
  }),
  time_end: z.string().min(2, {
    message: "Waktu berakhir harus di isi",
  }),
  purpose: z.string().min(2, {
    message: "Tujuan harus di isi",
  }),
});

export const ProfileAccountSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.string().email("Email tidak valid"),
});

export const PasswordUserSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Password lama harus di isi",
  }),
  password: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak sesuai",
  path: ["confirmPassword"],
});