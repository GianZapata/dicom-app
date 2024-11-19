"use client"

import { type FC } from 'react';

import Link from 'next/link';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { Attachment, UserAttachment } from '@prisma/client';

interface UserAttachmentWithAttachment extends UserAttachment {
   attachment: Attachment
}

interface StudiesPageProps {
   attachments: UserAttachmentWithAttachment[]
}

export const StudiesPage : FC<StudiesPageProps> = ({ attachments }) => {

   return (
      <>
         <Typography variant="h4" gutterBottom fontWeight={800}>
            Mis estudios
         </Typography>
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>ID</TableCell>
                     <TableCell>Nombre</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {attachments.map(({attachment}) => (
                     <TableRow key={attachment.id}>
                        <TableCell>{attachment.id}</TableCell>
                        <TableCell>{attachment.originalName}</TableCell>
                        <TableCell>
                           <Link
                              href={`/api/attachments/${attachment.name}`}
                              passHref
                              download
                              target='_blank'
                              rel='noopener noreferrer'
                              >
                                 <Tooltip title="Descargar estudios">
                                    <IconButton>
                                       <CloudDownloadIcon />
                                    </IconButton>
                                 </Tooltip>
                              </Link>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
};
