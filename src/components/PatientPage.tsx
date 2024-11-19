"use client"

import { useState, type FC } from 'react';
import { Attachment, User, UserAttachment } from '@prisma/client';

import Link from 'next/link';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Box } from '@mui/material';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

interface PatientWithAttachments extends User {
   attachments: PatientAttachment[]
}

interface PatientAttachment extends UserAttachment {
   attachment: Attachment
}

interface PatientPageProps {
   patients: PatientWithAttachments[]  
}

export const PatientPage : FC<PatientPageProps> = ({ patients }) => {

   const [isOpen, setIsOpen] = useState(false)
   const [selectedPatient, setSelectedPatient] = useState<PatientWithAttachments | null>(null)

   const onClose = () => {
      setIsOpen(false)
      setSelectedPatient(null)
   }

   const onOpen = (patient: PatientWithAttachments) => {
      setSelectedPatient(patient)
      setIsOpen(true)
   }

   return (
      <>
         <Typography variant="h4" gutterBottom>
            Listado de pacientes
         </Typography>
         <TableContainer component={Paper}>
            <Table>
            <TableHead>
               <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell></TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {patients.map((patient) => (
                  <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>
                     <Tooltip title="Ver archivos">
                        <IconButton
                           onClick={() => onOpen(patient)}
                        >
                           <FileDownloadIcon />
                        </IconButton>
                     </Tooltip>
                  </TableCell>
                  </TableRow>
               ))}
            </TableBody>
            </Table>
         </TableContainer>
         { isOpen && selectedPatient && (
            <PatientDialog
               patient={selectedPatient}
               isOpen={isOpen}
               onClose={onClose}
            />
         )}
      </>
   );
};

interface PatientDialogProps {
   patient: PatientWithAttachments
   isOpen: boolean
   onClose: () => void
}

const PatientDialog = ({ patient, isOpen, onClose }:PatientDialogProps) => {
   return (
      <Dialog
         open={isOpen}
         onClose={onClose}
         maxWidth="sm"
         fullWidth
      >
         <DialogTitle>
            <Typography variant="h5" fontWeight={800}>
               Archivos del paciente: {patient.name}
            </Typography>
         </DialogTitle>

         <DialogContent dividers>
            {patient.attachments.length > 0 ? (
               <List>
                  {patient.attachments.map((patientAttachment) => (
                     <Box boxShadow={1}  key={patientAttachment.id}>
                        <ListItem>
                           <ListItemIcon>
                              <AttachFileIcon />
                           </ListItemIcon>
                           <ListItemText primary={patientAttachment.attachment.originalName} />
                           <ListItemSecondaryAction>
                              <IconButton>
                              <Link
                                 href={`/api/attachments/${patientAttachment.attachment.name}`}
                                 passHref
                                 download
                                 target='_blank'
                                 rel='noopener noreferrer'
                              >
                                 <CloudDownloadIcon />
                              </Link>
                              </IconButton>
                           </ListItemSecondaryAction>
                        </ListItem>
                     </Box>
                  ))}
               </List>
            ) : (
               <Typography variant="body1">
                  Este paciente no tiene archivos adjuntos.
               </Typography>
            )}
            </DialogContent>


         <DialogActions>
            <Button onClick={onClose}
               color="primary"
               variant='contained'
            >Cerrar</Button>
         </DialogActions>
      </Dialog>
   )
}