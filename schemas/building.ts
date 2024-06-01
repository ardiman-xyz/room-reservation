import { z } from "zod";

export const formCreate = z.object({
  name: z
    .string()
    .min(2, {
      message: "Input harus di isi",
    })
    .max(50),
});
