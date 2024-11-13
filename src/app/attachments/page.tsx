"use server"

import { findAllAttachments } from "@/actions/get-attachments.action";
import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import Link from 'next/link';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const AttachmentsPage = async () => {

   const attachments = await findAllAttachments();

   return (
      <>
         <Toolbar   />
         <Toolbar   />
         <Container>
         
         <Typography variant="h4" mb={3}>Archivos DICOM</Typography>

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
               <TableHead>
                  <TableRow>
                     <TableCell>ID </TableCell>
                     <TableCell>Nombre</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {attachments.map((attachment) => (
                     <TableRow key={attachment.id}>
                        <TableCell>{attachment.id}</TableCell>
                        <TableCell>{attachment.name}</TableCell>
                        <TableCell>
                           <Link href={`/api/attachments/${attachment.id}`}>
                              <IconButton >
                                 <FileDownloadIcon />
                              </IconButton>
                           </Link>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         </Container>
      </>
   )
}

export default AttachmentsPage