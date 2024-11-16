import { User as PrismaUser, UserType } from "@prisma/client"


export interface UserEntity extends Omit<PrismaUser, 'password'> {}

declare module '@auth/core/types' {
  interface Session {
    user: UserEntity;
  }

  interface User extends UserEntity {
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    user: UserEntity;
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    userType: string;
    user: UserEntity;
  }

  interface User extends UserEntity {
    userType: UserType;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userType: UserType;
    user: UserEntity;
  }
}
