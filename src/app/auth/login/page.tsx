"use client"

import { loginSchema, LoginSchema, registerSchema, RegisterSchema, UserType } from "@/schemas/auth.schema";
import { Button, Container, Grid2, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction,  } from "@/actions/auth.action";
import { toast, } from "react-hot-toast";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";

export default function Home() {
    
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: 'gian@gian.com',
        password: '123456',
      }
  })

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
      try {
        const response = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })
        if( !response || ! response.ok) {
          throw new Error('No se pudo iniciar sesión, revisa tus credenciales.')
        }
        toast.success('Inicio de sesión exitoso')
        router.push('/dashboard')
      } catch (error: any) {
        toast.error(error.message)
      }
  }

  return (
        <>
          <Toolbar />
          <Toolbar />
          <Container maxWidth='sm'>
              <Typography variant="h3" textAlign="center" fontWeight="900" >Iniciar sesión</Typography>
              <Typography textAlign="center">Ingresa tus datos para iniciar sesión</Typography>
              <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <Grid2 container spacing={3} my={3}>
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
                      <Button 
                          variant="contained" 
                          fullWidth 
                          type="submit"
                      >Iniciar sesión</Button>
                    </Grid2>
                </Grid2>
              </form>
          </Container>
        </>
  );
}
