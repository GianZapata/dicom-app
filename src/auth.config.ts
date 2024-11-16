import { AuthOptions, Session} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from './schemas/auth.schema';
import { loginAction } from './actions/auth.action';

export const authConfig: AuthOptions = {
   debug: false,
   secret: process.env.NEXTAUTH_SECRET,
   session: {
      strategy: 'jwt',
      maxAge: 24 * 60 * 60, // 24 hours
      updateAge: 24 * 60 * 60 // 24 hours
   },
   pages: {
      signIn: '/login'
   },
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "Username", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", tGype: "password" }
         },
         type: "credentials",
         async authorize(credentials) {
            const parsedCredentials = loginSchema.safeParse(credentials);
            if(!parsedCredentials.success) return null;
            try {
               const { data } = await loginAction(parsedCredentials.data);
               return {
                  ...data,
                  id: String(data.id),
               }
            } catch (error) {
               throw new Error("Invalid credentials");
            }
         },
      }),
   ],

  callbacks: {
   async jwt({ user, account, token, trigger }) {
      console.log({ user, account, token, trigger });
     switch (trigger) {
       case 'signIn':
         if (!account) break;
         switch (account.type) {
           case 'credentials':
             token.user = token.user || user;
             token.userType = user.userType;
             break;
           default:
             break;
         }
         break;
       default:
         break;
     }

     return token;
   },
   session({ session, token }) {
     const newSession = session as Session;
     newSession.user = token.user;
     newSession.userType = token.userType;
     console.log({ session, token });
     return newSession;
   }
 }
}