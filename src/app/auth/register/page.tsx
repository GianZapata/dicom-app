"use client"

import { registerSchema, RegisterSchema, UserType } from "@/schemas/auth.schema";
import { Button, Container, Grid2, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/actions/auth.action";
import { toast, } from "react-hot-toast";

export default function Home() {
   
   const { control, handleSubmit, formState } = useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         name: 'Gian',
         email: 'gian@gian.com',
         password: '123456',
         userType: UserType.HOSPITAL
      }
   })

   const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
      toast.promise(registerAction(data), {
         loading: 'Creando tu cuenta...',
         success: ({ message }) => {
            return message
         },
         error: ({ message }) => {
            return message
         }
      })
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
         </Container>
      </>
   );
}
