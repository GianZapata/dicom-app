import { z } from 'zod'

// Inicio de Sesión: correo y contraseña 
export const loginSchema = z.object({
   email: z.string().email(), // gian.com => false
   password: z.string().min(6) // 123 => false, 123456 => true
})

export type LoginSchema = z.infer<typeof loginSchema>

export enum UserType {
   HOSPITAL = 'HOSPITAL',
   PATIENT = 'PATIENT',
   DOCTOR = 'DOCTOR'
}

export const validUserTypes: UserType[] = [UserType.HOSPITAL, UserType.PATIENT, UserType.DOCTOR]

// Creación de cuenta: Nombre, Correo, Contraseña y Tipo de cuenta
export const registerSchema = z.object({
   name: z.string().min(3), // Gian => true, Gi => false
   email: z.string().email(), // gian.com => false, gian@gmail.com => true
   password: z.string({ message: 'La contraseña es requerida'}).min(6, { message: 'La contraseña tiene que ser de 6 caracteres'}), // 123 => false, 123456 => true,
   userType: z.enum([UserType.HOSPITAL, UserType.PATIENT, UserType.DOCTOR]) // HOSPITAL => true, ADMIN => false
})

export type RegisterSchema = z.infer<typeof registerSchema>



export class CustomError extends Error {
   constructor(message: string) {
      super(message)
      this.name = 'CustomError'
   }
}