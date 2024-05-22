"use server";

import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {db} from "@/lib/db";
import bcrypt from "bcryptjs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if(!validatedFields.success) {
    return {error: "invalid fields"};
  }

  const { email, password } = validatedFields.data

  const user = await db.user.findUnique({
    where: {
      email
    }
  });

  if(!user) {
    return {error: "user not found!"};
  }


  return {success: "Login successfully"};

};

