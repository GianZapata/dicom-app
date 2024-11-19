"use server"

import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { PatientWithAttachments } from '@/types/user.interface'

const UPLOAD_FOLDER = 'uploads'
const validExtensions = ['.zip']

interface DataResponse {
   data: PatientWithAttachments | null;
   message: string
}

const prisma = new PrismaClient()

export const uploadFileAction = async (formData: FormData): Promise<DataResponse> => {

   await new Promise(resolve => setTimeout(resolve, 2000))
   
   try {
      
      // Obtener archivo
      const file = formData.get('file') as File
      const patientId = formData.get('patientId') as string
      if( !file ) return { data: null, message: 'No se ha encontrado el archivo.' }

      if( !patientId ) return{ data: null, message: 'No se ha encontrado el paciente.' };

      const patientExists = await prisma.user.findUnique({
         where: {
            id: parseInt(patientId),
            userType: 'PATIENT'
         }
      })

      if (!patientExists) return { data: null, message: 'El paciente no existe.' }

      // Verificar la extensión
      const fileExtension = path.extname(file.name)
      if (!validExtensions.includes(fileExtension)) return { data: null, message: 'La extensión del archivo no es válida.' }

      // Verificar si existe la carpeta o si no crearla 
      const folderPath = path.join(process.cwd(), UPLOAD_FOLDER)

      if (!fs.existsSync(folderPath)) {
         fs.mkdirSync(folderPath);
      } 

      const storagePath = `${UPLOAD_FOLDER}`
      const newName = uuid();
      const newFileName = `${newName}${fileExtension}`

      const fileUploadPath = path.join(process.cwd(), storagePath, newFileName)

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      fs.writeFileSync(fileUploadPath, buffer)

      await prisma.userAttachment.create({
         data: {
            user: {
               connect: {
                  id: parseInt(patientId)
               }
            },
            attachment: {
               create: {
                  originalName: file.name,
                  extension: fileExtension,
                  mimeType: file.type,
                  name: newFileName,
                  path: storagePath,
               }
            }
         }
      })

      const updatedPatient = await prisma.user.findUnique({
         where: { id: parseInt(patientId) },
         select: { 
            id: true,
            name: true,
            email: true,
            attachments: {
               select: {
                  id: true,
                  userId: true,
                  attachmentId: true,
                  user: true,
                  attachment: true
               }
            },
            userType: true
         }
      })

      return { data: updatedPatient, message: 'Archivo subido correctamente' }
   } catch (error) {
      console.log({ error})
      return { data: null, message: 'Hubo un error en subir el archivo' }
   }

}

