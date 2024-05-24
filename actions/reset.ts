"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user";
import {generatePasswordResetToken} from "@/lib/token";
import {sendPasswordResetEmail} from "@/lib/mail";

export const resetEmail = async (values: z.infer<typeof ResetSchema>) => {
    const validatedField = ResetSchema.safeParse(values);

    if(!validatedField.success) return {error: "invalid email"};

    const {email} = validatedField.data;

    const user = await getUserByEmail(email);
    if(!user) return {error: "Email not found "};

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return {success: "Reset email sent!"};

}