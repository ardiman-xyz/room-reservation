import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import {getUserById} from "@/data/user";
import {UserRole} from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async signIn({user, account}) {
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);

            if(!existingUser?.emailVerified) return false;

            return true
        },
        async session({ session, token }) {

            if(token.sub && session.user)
            {
                session.user.id = token.sub
            }

            if(token.role && session.user)
            {
                session.user.role = token.role as UserRole
            }

            return session
        },
        async jwt({ token }) {
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if(!existingUser) return token;

            token.role = existingUser.role;
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})