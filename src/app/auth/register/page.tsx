"use client"

import { CustomError, registerSchema, RegisterSchema, UserType } from "@/schemas/auth.schema";
import { Box, Button, Container, Grid2, Link, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/actions/auth.action";
import { toast, } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
   const router = useRouter()
   const { control, handleSubmit, formState } = useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
   })

   const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
      const loadingToastId = toast.loading('Creando tu cuenta...')

      try {
         const { message } = await registerAction(data)

         await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
         })

         toast.dismiss(loadingToastId)
         toast.success(message)
         router.push('/dashboard')
      } catch (error) {
         loadingToastId && toast.dismiss(loadingToastId)
         if( error instanceof CustomError ) return toast.error(error.message)
         return toast.error('Hubo un error al crear tu cuenta')
      }
   }

   return (
      <>
         <Toolbar />
         <Toolbar />
         <Container maxWidth='sm'>
            <Typography variant="h3" textAlign="center" fontWeight="900" >Crear tu cuenta</Typography>
            <Typography textAlign="center">Ingresa tus datos para crear tu cuenta</Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
               <Grid2 container spacing={3} my={3}>
                  <Grid2 size={12}>
                     <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                           <TextField
                              {...field}
                              label="Nombre"
                              placeholder="Ingresa tu nombre"
                              fullWidth
                              required
                              error={!!error}
                              helperText={error?.message}
                           />
                        )
                        }
                     />
                  </Grid2>
                  <Grid2 size={12}>
                     <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                           <TextField
                              {...field}
                              label="Correo Electrónico"
                              placeholder="Ingresa tu correo electrónico"
                              fullWidth
                              required
                              type="email"
                              error={!!error}
                              helperText={error?.message}
                           />
                        )
                        }
                     />
                  </Grid2>
                  <Grid2 size={12}>
                     <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                           <TextField
                              {...field}
                              label="Contraseña"
                              placeholder="Ingresa tu contraseña"
                              fullWidth
                              type="password"
                              required
                              error={!!error}
                              helperText={error?.message}
                           />
                        )
                        }
                     />
                  </Grid2>
                  <Grid2 size={12}>
                     <Controller
                        name="userType"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                           <TextField
                              {...field}
                              label="Tipo de cuenta"
                              select
                              fullWidth
                              required
                              error={!!error}
                              helperText={error?.message}
                           >
                              <MenuItem value="">Seleccione</MenuItem>
                              <MenuItem value="HOSPITAL">Hospital</MenuItem>
                              <MenuItem value="PATIENT">Paciente</MenuItem>
                              <MenuItem value="DOCTOR">Médico</MenuItem>
                           </TextField>
                        )
                        }
                     />
                  </Grid2>
                  <Grid2 size={12}>
                     <Button 
                        variant="contained" 
                        fullWidth 
                        type="submit"
                     >Crear cuenta</Button>
                  </Grid2>
               </Grid2>
            </form>

            <Box>
               <Typography textAlign="center">¿Ya tienes una cuenta? <Link href="/auth/login">Inicia sesión</Link></Typography>
            </Box>
         </Container>
      </>
   );
}
