"use server"

import { prismaClient } from "@/config/prisma.client"
import { UserEntity } from "@/next-auth"
import { loginSchema, LoginSchema, registerSchema, RegisterSchema } from "@/schemas/auth.schema"
import { User } from "@prisma/client"
import bcrypt from 'bcrypt'

interface Response {
   data: UserEntity
   message: string
}

export const loginAction = async ( data: LoginSchema ): Promise<Response> => {
   
   const credentials = loginSchema.safeParse(data)
   if(!credentials.success) throw new Error('Las credenciales no son válidas, revisa tus datos.')

   const { email, password } = credentials.data

   const user = await prismaClient.user.findFirst({ where: { email },  })
   if(!user) throw new Error('Las credenciales no son válidas, revisa tus datos.')

   const passwordMatch = await bcrypt.compare(password, user.password)
   if(!passwordMatch) throw new Error('Las credenciales no son válidas, revisa tus datos.')

   const { password: _, ...userWithoutPassword } = user

   return { data: userWithoutPassword, message: 'Inicio de sesión exitoso' };
}

export const registerAction = async ( data: RegisterSchema ): Promise<Response> => {
   
   // Validar y formatear los datos del usuario 
   const credentials = registerSchema.safeParse(data)
   if(!credentials.success) throw new Error('Las credenciales no son válidas, revisa tus datos.')
      
   const { name, email, password, userType } = credentials.data

   const validUserTypes = ['HOSPITAL', 'DOCTOR', 'PATIENT']

   if( !validUserTypes.includes(userType) ) throw new Error(`El tipo de usuario no es válido: Los tipos de usuarios validos son: ${validUserTypes.join(', ')}`)

   // Si ya existe el correo no debe permitir crear la cuenta, no permitir duplicados
   const userExists = await prismaClient.user.findFirst({ where: { email } })
   if( userExists ) throw new Error('El correo ya está registrado, intenta con otro.')

   // Encriptar la contraseña del usuario 
   const hashedPassword = await bcrypt.hash(password, 10)
   
   // Guardar el usuario.
   const createdUser = await prismaClient.user.create({
      data: {
         name,
         email,
         password: hashedPassword,
         userType
      }
   })

   return {
      data: createdUser,
      message: 'Usuario creado con éxito.'
   };
}

