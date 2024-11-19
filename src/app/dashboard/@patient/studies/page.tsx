import { authConfig } from "@/auth.config";
import { StudiesPage } from "@/components/StudiesPage";
import { prismaClient } from "@/config/prisma.client";
import { getServerSession } from "next-auth";

const Page = async () => {

   const session = await getServerSession(authConfig);
   
   const attachments = await prismaClient.userAttachment.findMany({
      where: { userId: +session!.user.id },
      include: {
         attachment: true
      }
   })

   return <StudiesPage attachments={attachments} />
}

export default Page