import { authConfig } from '@/auth.config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
   hospital: ReactNode
   doctor: ReactNode
   patient: ReactNode
}



const Layout = async ({ hospital, doctor, patient }: Props) => {

   const session = await getServerSession(authConfig);
   if (!session || !session.userType) return redirect("/auth/login");

   if( session.userType === 'DOCTOR') return <>{ doctor }</>
   if( session.userType === 'HOSPITAL') return <>{ hospital }</>
   if( session.userType === 'PATIENT') return <>{ patient }</>

   return redirect('/auth/login')
}

export default Layout