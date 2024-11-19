import { MyPatientPage } from "@/components/MyPatientsPage"
import { prismaClient } from "@/config/prisma.client"

const Page = async () => {

  const patients = await prismaClient.user.findMany({ 
    where: { userType: 'PATIENT' },
    select: { id: true, name: true, email: true, userType: true, attachments: { include: { attachment: true }}, }
  })

  return <MyPatientPage patients={patients}/>

}

export default Page