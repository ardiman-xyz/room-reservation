"use server"

import * as z from "zod";

import {db} from "@/lib/db";
import {PasswordUserSchema, ProfileAccountSchema,} from "@/schemas";
import {getUserByEmail, getUserById} from "@/data/user";
import bcrypt from "bcryptjs";

export const updateProfile = async (values: z.infer<typeof ProfileAccountSchema>, id: string) => {

    const validatedFields = ProfileAccountSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "invalid fields"};
    }

    const isExistingUser = await getUserById(id);
    if(!isExistingUser) return  {error: "User tidak ditemukan!"};

    const { email, name } = validatedFields.data;

    const isExistingEmail = await getUserByEmail(email, id);
    if(isExistingEmail) return  {error: "Email telah digunakan oleh orang lain!"};

     await db.user.update({
        where: {id},
        data: {
            name,
            email
        }
    });

    return {success: "Data profil berhasil di update!"}

}

export const updatePassword = async (values: z.infer<typeof PasswordUserSchema>, id: string) => {

    const validatedFields = PasswordUserSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "invalid fields"};
    }

    const user = await getUserById(id);
    if(!user) return  {error: "User tidak ditemukan!"};

    const { currentPassword, password } = validatedFields.data;

    const passwordMatch = await bcrypt.compare(currentPassword, user.password as string);

    if(!passwordMatch) return  {error: "Password lama tidak sesuai!"};

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id},
        data: {
            password: hashedPassword,
        }
    });

    return {success: "Password berhasil di ubah"}

}