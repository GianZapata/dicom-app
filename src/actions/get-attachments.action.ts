"use server"

import { prismaClient } from '../config/prisma.client';

export const findAllAttachments = async () => {
   const attachments = await prismaClient.attachment.findMany();
   return attachments;
}

export const findOneAttachmentById = async (id: number) => {
   try {
      const attachment = await prismaClient.attachment.findUnique({
         where: {
            id: id
         }
      });
      return attachment;   
   } catch (error) {
      return null;
   }
   
}