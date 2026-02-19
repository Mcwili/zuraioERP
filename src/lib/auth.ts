import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: Role;
    };
  }
  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.isActive) return null;

        const valid = await compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      // #region agent log
      const _p = { sessionId: "faa0f8", location: "auth.ts", message: "auth: redirect callback", data: { url, baseUrl, nextAuthUrl: process.env.NEXTAUTH_URL }, timestamp: Date.now(), hypothesisId: "D1" };
      console.log("[DEBUG][faa0f8]", JSON.stringify(_p));
      fetch("http://127.0.0.1:7618/ingest/a69c7205-1643-4ebf-93f3-fc833731c99f", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "faa0f8" }, body: JSON.stringify(_p) }).catch(() => {});
      // #endregion
      // Verhindert doppeltes Einloggen: callbackUrl muss zur App gehören
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 Stunden
    updateAge: 60 * 60, // 1 Stunde - Session wird alle Stunde aktualisiert
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
