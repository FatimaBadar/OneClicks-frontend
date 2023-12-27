import NextAuth from "next-auth";
import { options } from "./options";

declare module 'next-auth' {
    interface Session {
      user: {
        name?: string;
        token?: string;
        email?: string;
      };
    }
  }
  
const handler = NextAuth(options)

export {handler as GET, handler as POST}