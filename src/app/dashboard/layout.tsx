import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
   hospital: ReactNode
   doctor: ReactNode
   patient: ReactNode
}

type UserType = 'doctor' | 'hospital' | 'patient'

interface User {
   id: number;
   name: string;
   email: string;
   userType: UserType
}

const user: User = {
   id: 1,
   name: 'Gian',
   email: 'gian@gian.com',
   userType: "patient"
};

const Layout = ({ hospital, doctor, patient }: Props) => {
   
   if( user.userType === 'doctor') return <>{ doctor }</>
   if( user.userType === 'hospital') return <>{ hospital }</>
   if( user.userType === 'patient') return <>{ patient }</>

   return redirect('/auth/login')
}

export default Layout