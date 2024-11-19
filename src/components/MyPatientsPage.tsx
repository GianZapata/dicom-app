"use client"

import { Dispatch, SetStateAction, useRef, useState, type FC } from 'react';
import { PatientDialog } from './PatientPage';
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { PatientWithAttachments } from '@/types/user.interface';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadFileAction } from '@/actions/upload-file.action';
import toast from 'react-hot-toast';

interface MyPatientsPageProps {
   patients: PatientWithAttachments[]
}

export const MyPatientPage : FC<MyPatientsPageProps> = ({ patients: dbPatients }) => {
   const [patients, setPatients] = useState<PatientWithAttachments[]>(dbPatients)
   const [isOpen, setIsOpen] = useState(false)
   const [isOpenUpload, setIsOpenUpload] = useState(false)
   const [selectedPatient, setSelectedPatient] = useState<PatientWithAttachments | null>(null)

   const onClose = () => {
      setIsOpen(false)
      setSelectedPatient(null)
   }

   const onCloseUpload = () => {
      setIsOpenUpload(false)
      setSelectedPatient(null)
   }

   const onOpenUpload = (patient: PatientWithAttachments) => {
      setSelectedPatient(patient)
      setIsOpenUpload(true)
   }

   const onOpen = (patient: PatientWithAttachments) => {
      setSelectedPatient(patient)
      setIsOpen(true)
   }

   return (
      <>
         <Typography variant="h4" gutterBottom>
            Mis pacientes
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
                        <Tooltip title="Subir estudios">
                           <IconButton
                              onClick={() => onOpenUpload(patient)}
                           >
                              <CloudUploadIcon />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="Ver estudios">
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
         { isOpenUpload && selectedPatient && (
            <UploadFileDialog
               patient={selectedPatient}
               isOpen={isOpenUpload}
               onClose={onCloseUpload}
               setPatients={setPatients}
            />
         )}
      </>
   );
};

interface UploadFileDialogProps {
   isOpen: boolean
   onClose: () => void
   patient: PatientWithAttachments
   setPatients: Dispatch<SetStateAction<PatientWithAttachments[]>>
}

const UploadFileDialog = ({ isOpen, onClose, patient, setPatients }: UploadFileDialogProps) => {

   const [file, setFile] = useState<File | null>(null)
   const [isUploading, setIsUploading] = useState(false)

   const hiddenFileInput = useRef<HTMLInputElement>(null)

   const handleButtonClick = () => {
         hiddenFileInput.current?.click()
   }

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         setFile(event.target.files[0])
      }
   }

   const uploadPatientFile = async () => {
      if (!file) return toast.error('No se ha seleccionado un archivo')

      const toastId = toast.loading('Subiendo archivo...')
      setIsUploading(true)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('patientId', String(patient.id))

      try {
         const { data, message } = await uploadFileAction(formData)
         toast.dismiss(toastId)
         if (!data) return toast.error(message)

         setPatients( prevPatients => prevPatients.map( patient => {
            if (patient.id === data.id) return data
            return patient
         }))
         toast.success(message)
         setFile(null)
      } catch (error) {
         toast.error('Ocurrió un error al subir el archivo')
      } finally {
         setIsUploading(false)
         onClose()
      }
   }

   return (
      <>
      <Dialog
         open={isOpen}
         onClose={onClose}
         maxWidth="sm"
         fullWidth
      >
         <DialogTitle>
            <Typography variant="h5" fontWeight={800}>
               Estudios del paciente: {patient.name}
            </Typography>
         </DialogTitle>

         <DialogContent dividers>
            <Button
               variant='contained'
               color='primary'
               startIcon={<CloudUploadIcon />}
               fullWidth
               onClick={handleButtonClick}
               disabled={isUploading}
            >
               {isUploading ? 'Subiendo...' : 'Seleccionar archivo'}
            </Button>
            <input
               type="file"
               ref={hiddenFileInput}
               onChange={handleFileChange}
               hidden
               accept=".zip"
            />
            {file && (
               <Typography mt={2} variant='body1' textAlign={'center'}>
                  Archivo seleccionado: {file.name}
               </Typography>
            )}
         </DialogContent>

         <DialogActions>
            <Button onClick={onClose}
               color="primary"
               variant='contained'
            >Cerrar</Button>
            <Button
               variant={ file || isUploading ? 'contained' : 'outlined' }
               color='secondary'
               onClick={uploadPatientFile}
               disabled={isUploading || !file}
               startIcon={isUploading ? <CircularProgress size={20} /> : null}
            >
               {isUploading ? 'Subiendo...' : 'Subir archivo'}
            </Button>
         </DialogActions>
         </Dialog>
      </>
   )
}