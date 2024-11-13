"use server"

import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

const UPLOAD_FOLDER = 'uploads'
const validExtensions = ['.dcm']


interface DataResponse {
   data: boolean;
   message: string
}

const prisma = new PrismaClient()

export const uploadFileAction = async (formData: FormData): Promise<DataResponse> => {
   try {
      
      // Obtener archivo
      const file = formData.get('file') as File
      if( !file ) throw new Error('No se ha encontrado el archivo.');

      // Verificar la extensión
      const fileExtension = path.extname(file.name)
      if (!validExtensions.includes(fileExtension)) throw new Error('El archivo seleccionado no es un archivo DICOM.')

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

      const newAttachment = await prisma.attachment.create({
         data: {
            originalName: file.name,
            extension: fileExtension,
            mimeType: file.type,
            name: newFileName,
            path: storagePath,
         }
      })

      console.log({ newAttachment})

      return { data: true, message: 'Archivo subido correctamente' }
   } catch (error) {
      return { data: false, message: 'Hubo un error en subir el archivo' }
   }

}

