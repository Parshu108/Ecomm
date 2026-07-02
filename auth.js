import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          },
        );

        if (!res.ok) return null;

        const user = await res.json();
        return user; // make sure 'role' is included here
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: { signIn: "/router/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.role = user.role; // 👈 add
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // 👈 add
      }
      return session;
    },
  },
});
