import type { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
// import CredentialsProvider  from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID as string,
        clientSecret: process.env.FACEBOOK_SECRET as string,
      }),
      
    
      // CredentialsProvider({
      //     name: "Credentials",
      //     credentials: {
      //         username: {
      //             label: "Username",
      //             type:"text",
      //             placeholder: "Your username"
      //         },
      //         password: {
      //             label: "Password",
      //             type:"password",
      //             placeholder: "Your password"
      //         }
      //     },
      //     async authorize(credentials){
      //         //retrieve user data to verify with creds
      //         const user = {id: "42", name: "DAve", password: "nextauth"}

      //         if(credentials?.username ===user.name && credentials?.password
      //             === user.password){
      //                 return user
      //             }
      //             else{
      //                 return null
      //             }
      //     }

      // })
    ],

    pages: {
      signIn: '/adAccount/nextauth',
      signOut: '/auth/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
      verifyRequest: '/auth/verify-request', // (used for check email message)
      newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}
