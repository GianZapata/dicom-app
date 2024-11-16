import { AuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from './schemas/auth.schema';
import { loginAction } from './actions/auth.action';

export const authConfig: AuthOptions = {
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
   ]
}