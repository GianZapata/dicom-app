import fs from 'fs';

export async function GET(
   request: Request,
   { params }: { params: { fileName: string } }
) {
   const { fileName } = params;

   const currentPath = process.cwd();
   const filePath = `${currentPath}/uploads/${fileName}`;

   if(!fs.existsSync(filePath)) return Response.json({ error: 'El archivo no fue encontrado' }, { status: 404 });

   const fileContent = fs.readFileSync(filePath);

   return new Response(fileContent, {
      status: 200,
      headers: {
         'Content-Type': 'application/octet-stream',
         'Content-Disposition': `attachment; filename="${fileName}"`,
      },
   });

}