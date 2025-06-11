import { prisma } from "@/db/prisma";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await prisma.user.findFirst({
            where: { email },
          });
          if (!user || !user.password) {
            return null;
          }
          const passwordMatcher = await compare(password, user.password);
          if (passwordMatcher) {
            return user;
          }
        }
        return null;
      },
    }),
    Google,
  ],
  pages: {
    signIn: "/auth/login",
  },
});
