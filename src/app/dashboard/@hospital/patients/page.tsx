import { PatientPage } from "@/components/PatientPage"
import { prismaClient } from "@/config/prisma.client"

const Page = async () => {

  const patients = await prismaClient.user.findMany({ 
    where: { userType: 'PATIENT' },
    include: {
      attachments: {
        include: {
          attachment: true
        }
      }
    }
  })
  return <PatientPage patients={patients} />
}

export default Page