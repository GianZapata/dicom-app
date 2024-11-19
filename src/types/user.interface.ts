import { Attachment, User, UserAttachment } from "@prisma/client"

export type UserWithoutPassword = Omit<User, 'password'>

export interface PatientWithAttachments extends UserWithoutPassword {
   attachments: PatientAttachment[]
}

export interface PatientAttachment extends UserAttachment {
   attachment: Attachment
}

interface PatientPageProps {
   patients: PatientWithAttachments[]  
}