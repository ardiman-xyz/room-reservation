import type { NextAuthConfig } from "next-auth";
import Credential from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

import {LoginSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";

export default {
    providers: [
        Credential({
            async authorize(credential) {
                const validatedFields = LoginSchema.safeParse(credential);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if(passwordMatch) return user;
                }
                return null
            }
        })
    ]
} satisfies NextAuthConfig