"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import {ResetPasswordSchema} from "@/schemas";
import {getPasswordResetTokenByToken} from "@/data/password-reset-token";
import {getUserByEmail} from "@/data/user";
import {db} from "@/lib/db";

export const newPassword = async (values: z.infer<typeof ResetPasswordSchema>, token: string | null) => {

    if(!token) return {error: "Missing token !"};

    const validatedField = ResetPasswordSchema.safeParse(values);
    if(!validatedField.success) return {error: "Invalid field"};

    const {password} = validatedField.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if(!existingToken) return {error: "Invalid token"};

    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired) return {error: "Token has expires!"};

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser) return {error: "Email doesn't exist"};

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where : {id: existingUser.id},
        data: { password: hashedPassword }
    });

    await db.passwordResetToken.delete({
        where: {id: existingToken.id},
    });

    return {success: "Password updated successfully"};
}
