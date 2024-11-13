"use client"

import { registerSchema, RegisterSchema } from "@/schemas/auth.schema";
import { Button, Container, Grid2, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
   
   const { control, handleSubmit, formState } = useForm<RegisterSchema>({
      defaultValues: {
         password: '123'
      },
      resolver: zodResolver(registerSchema)
   })

   console.log( formState.errors )

   const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
      console.log(data)
   }
   
   return (
      <>
         <Toolbar />
         <Toolbar />
         <Container maxWidth='sm'>
            <Typography variant="h3" textAlign="center" fontWeight="900" >Crear tu cuenta</Typography>
            <Typography textAlign="center">Ingresa tus datos para crear tu cuenta</Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
               <Grid2 container spacing={3} my={3}>
                  <Grid2 size={12}>
                     <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                           <TextField
                              {...field}
                              label="Nombre"
                              placeholder="Ingresa tu nombre"
                              fullWidth
                              required
                           />
                        )
                     }
                     />
                     
                  </Grid2>
                  <Grid2 size={12}>
                     <TextField
                        label="Correo Electrónico"
                        placeholder="Ingresa tu correo electrónico"
                        fullWidth
                        type="email"
                        required
                     />
                  </Grid2>
                  <Grid2 size={12}>
                     <TextField
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        fullWidth
                        type="password"
                        required
                     />
                  </Grid2>
                  <Grid2 size={12}>
                     <TextField
                        label="Tipo de cuenta"
                        fullWidth
                        select
                        required
                     >
                        <MenuItem value="">Seleccione</MenuItem>
                        <MenuItem value="HOSPITAL">Hospital</MenuItem>
                        <MenuItem value="PATIENT">Paciente</MenuItem>
                        <MenuItem value="DOCTOR">Médico</MenuItem>
                     </TextField>
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
