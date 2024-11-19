import { authConfig } from '@/auth.config'
import { DashboardLayout, doctorMenuItems, hospitalMenuItems, patientMenuItems } from '@/components/DashboardLayout'
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

   if( session.userType === 'DOCTOR') return <DashboardLayout menuItems={doctorMenuItems}>{ doctor }</DashboardLayout>
   if( session.userType === 'HOSPITAL') return <DashboardLayout menuItems={hospitalMenuItems}>{ hospital }</DashboardLayout>
   if( session.userType === 'PATIENT') return <DashboardLayout menuItems={patientMenuItems}>{ patient }</DashboardLayout>

   return redirect('/auth/login')
}

export default Layout