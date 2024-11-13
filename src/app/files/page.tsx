"use client"

import React, { useState, useRef } from 'react'
import { Button, Container, Typography, CircularProgress, Toolbar } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { uploadFileAction } from '@/actions/upload-file.action'

const FilesPage = () => {
   const [file, setFile] = useState<File | null>(null)
   const [uploading, setUploading] = useState(false)
   const [message, setMessage] = useState<string | null>(null)
   
   const hiddenFileInput = useRef<HTMLInputElement>(null)

   const handleButtonClick = () => {
         hiddenFileInput.current?.click()
   }

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         setFile(event.target.files[0])
         setMessage(null)
      }
   }

   const handleUpload = async () => {
      if (!file) {
         setMessage('Por favor, selecciona un archivo primero.')
         return
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
         uploadFileAction(formData)
      } catch (error) {
         console.error('Error al subir el archivo:', error)
         setMessage('Error al subir el archivo.')
      } finally {
         setUploading(false)
      }
   }

   return (
      <>
      <Toolbar />
      <Toolbar />
      <Container maxWidth="sm">
         <Typography mb={3} variant='h3' textAlign={'center'}>
            Subir archivos
         </Typography>
         <Button
            variant='contained'
            color='primary'
            startIcon={<CloudUploadIcon />}
            fullWidth
            onClick={handleButtonClick}
            disabled={uploading}
         >
            {uploading ? 'Subiendo...' : 'Seleccionar archivo'}
         </Button>
         <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileChange}
            hidden
            accept=".dcm,application/dicom"
         />
         {file && (
            <Typography mt={2} variant='body1' textAlign={'center'}>
               Archivo seleccionado: {file.name}
            </Typography>
         )}
            <Button
               variant={ file ? 'contained' : 'outlined' }
               color='secondary'
               fullWidth
               onClick={handleUpload}
               disabled={uploading || !file}
               style={{ marginTop: '16px' }}
               startIcon={uploading ? <CircularProgress size={20} /> : null}
            >
               {uploading ? 'Subiendo...' : 'Subir archivo'}
            </Button>
         {message && (
            <Typography mt={2} variant='body2' textAlign={'center'} color={message.includes('exitosamente') ? 'green' : 'error'}>
               {message}
            </Typography>
         )}
         </Container>
      </>
   )
}

export default FilesPage