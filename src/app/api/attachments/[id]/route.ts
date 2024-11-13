import { findOneAttachmentById } from "@/actions/get-attachments.action"
import { NextResponse } from "next/server";
import fs from 'fs';
import dcmjs from 'dcmjs';
import { PNG } from 'pngjs';

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

      const dicomData = dcmjs.data.DicomMessage.readFile(fileContent.buffer);

      const patientName = dicomData.dict['00100010']?.Value?.[0] || 'Desconocido';
      const studyDate = dicomData.dict['00080020']?.Value?.[0];
      const modality = dicomData.dict['00080060']?.Value?.[0];

      return new NextResponse(fileContent, {
         status: 200,
         headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${fileName}"`,
         },
      });

      if ('7FE00010' in dicomData.dict) {
         const pixelDataElement = dicomData.dict['7FE00010'];
         const pixelData = pixelDataElement.Value[0];

         const rows = parseInt(dicomData.dict['00280010'].Value[0], 10);
         const cols = parseInt(dicomData.dict['00280011'].Value[0], 10);
         const bitsAllocated = parseInt(dicomData.dict['00280100'].Value[0], 10);

         let pixelDataArray;
         if (bitsAllocated === 16) {
            pixelDataArray = new Uint16Array(pixelData.buffer);
         } else {
            pixelDataArray = new Uint8Array(pixelData.buffer);
         }

         const pixelData8 = new Uint8Array(pixelDataArray.length);
         const maxVal = Math.max(...pixelDataArray);
         const minVal = Math.min(...pixelDataArray);

         for (let i = 0; i < pixelDataArray.length; i++) {
            pixelData8[i] = ((pixelDataArray[i] - minVal) * 255) / (maxVal - minVal);
         }

      
         // Crea una imagen PNG
         const png = new PNG({ width: cols, height: rows, colorType: 0 });

         // Convierte la imagen PNG a un buffer
         const pngBuffer = PNG.sync.write(png);

         fs.writeFileSync('test_image.png', pngBuffer);


         // Devuelve la imagen PNG al cliente
         return new NextResponse(pngBuffer, {
            status: 200,
            headers: {
               'Content-Type': 'image/png',
            },
         });
      } else {
         const metadata = {
            patientName,
            studyDate,
            modality,
         };
      }
   } catch (error) {
      console.error('Error al leer el archivo:', error);
      return new Response('Error al leer el archivo', { status: 500 });
   }

}
