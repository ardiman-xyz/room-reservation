import * as z from "zod";

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
