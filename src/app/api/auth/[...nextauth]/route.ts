import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "../../../lib/prisma";

interface Credentials {
  nim: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { nim, password } = credentials as Credentials;

        if (!nim) {
          throw new Error("NIM tidak boleh kosong");
        }

        if (!password) {
          throw new Error("Password tidak boleh kosong");
        }

        const user = await prisma.user.findUnique({
          where: {
            nim,
          },
        });

        if (!user) {
          throw new Error("User tidak ditemukan");
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Password salah");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: "secret", //process.env.NEXTAUTH_SECRET
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user && user.id) {
        console.log("User JWT ", user);
        token.uid = user.id as string; // Assign user's id to token

        // Get user's role
        const userData = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          select: {
            role: true,
          },
        });

        if (userData) {
          token.role = userData.role; // Assign role to token
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      // Get user's data
      const userData = await prisma.user.findUnique({
        where: {
          id: token.uid as string,
        },
        select: {
          id: true,
          nim: true,
          fullName: true,
          role: true,
          email: true,
          imageURL: true,
        },
      });

      if (token?.uid && userData) {
        // Check if token exists and has uid property
        session.user = userData;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
