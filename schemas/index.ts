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
