"use client"

import { FC, PropsWithChildren } from 'react'
import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';

export const DashboardLayout: FC<PropsWithChildren>= ({ children } ) => {
   return (
      <div>
         <Button onClick={() => signOut()}>Cerrar sesión</Button>
         { children }
      </div>
   )
}
