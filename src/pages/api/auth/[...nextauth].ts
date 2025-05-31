import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" } // Add email to credentials
      },
      async authorize(credentials) {
        // In a real application, you would verify credentials against a database
        // For this example, we're using hardcoded values
        if (
          credentials?.username === "admin" &&
          credentials?.password === "admin"
        ) {
          return { id: 1, name: credentials.username, email: credentials.email || "admin@example.com" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-123",
  // Add callbacks to ensure the name and email are correctly propagated to the session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
});
