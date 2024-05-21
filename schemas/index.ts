import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email tidak valid",
  }),
  password: z.string().min(2, {
    message: "Input Harus di isi!",
  }),
});
