import { AuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "Username", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", tGype: "password" }
         },
         type: "credentials",
         async authorize(credentials, req) {

            console.log(credentials);
            
            throw new Error("Invalid credentials");

            // const parsedCredentials = loginSchema.safeParse(credentials);

            // if(!parsedCredentials.success) return null;

            // const { email, password } = parsedCredentials.data;

            // console.log({ email, password })
            // const response = await UseCases.loginUseCase({ email, password });
            
            // if(!response) throw new Error("Invalid credentials");
            
            // const { user, token } = response;

            // return {
            //    id: String(user.id),
            //    name: user.name,
            //    accessToken: token,
            // };
         },
      }),
   ]
}