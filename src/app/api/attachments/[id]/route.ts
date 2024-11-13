import { findOneAttachmentById } from "@/actions/get-attachments.action"
import { NextResponse } from "next/server";
import fs from 'fs';

export async function GET(
   request: Request,
   { params }: { params: { id: string } }
) {
   const { id } = params

   const attachment = await findOneAttachmentById(Number(id))
   if(!attachment) return new Response(null, { status: 404 })

   
   const fileName = `${attachment.name}`
   const filePath = `${attachment.path}/${fileName}` // storage/attachments/fileName.ext
   const fullPath = `${process.cwd()}/${filePath}`

   try {
      const fileContent = fs.readFileSync(fullPath);

      // Devuelve la respuesta con el archivo y los encabezados adecuados
      return new NextResponse(fileContent, {
         status: 200,
         headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${fileName}"`,
         },
      });
   } catch (error) {
      console.error('Error al leer el archivo:', error);
      return new Response('Error al leer el archivo', { status: 500 });
   }

}
