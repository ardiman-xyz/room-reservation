"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import {AuthError} from "next-auth";

import {LoginSchema} from "@/schemas";
import {db} from "@/lib/db";
import {signIn} from "@/auth"
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {generateVerificationToken} from "@/lib/token";
import {sendVerificationEmail} from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if(!validatedFields.success) {
    return {error: "invalid fields"};
  }

  const { email, password } = validatedFields.data;

  const user = await db.user.findUnique({
    where: {
      email
    }
  });

  if(!user || !user.password) return {error: "invalid credential"};

  const passwordMatch = await bcrypt.compare(password, user.password);

  if(!passwordMatch) return {error: "invalid credential"};

  if(!user || !user.email || !user.password) return {error: "Email doesn't exist!"};

  if(!user.emailVerified){
    const verificationToken = await generateVerificationToken(user.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return {success: "Confirmation email sent!"}
  }

   try {
     await signIn("credentials", {
       email,
       password,
       redirectTo: DEFAULT_LOGIN_REDIRECT
     });

     return {success: "successfully logged in"};
   }catch (error){
     if(error instanceof  AuthError)
     {
       switch (error.type) {
         case "CredentialsSignin":
           return {error: "invalid credential"};
         default:
           return {error: "something went wrong"};
       }
     }

     throw error;
   }
};

