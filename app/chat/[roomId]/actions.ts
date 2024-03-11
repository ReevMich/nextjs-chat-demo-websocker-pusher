'use server';

import prisma from '@/lib/prisma';
import { pusherServer  } from '@/lib/pusher';

export async function SendMessage(formData: FormData) {
   const rawFormData = {
        roomId: formData.get('roomId') as string,
        content: formData.get('content') as string
   } 
   if (!rawFormData.roomId || !rawFormData.content) {
        console.log('Invalid form data')
       return;
   }
   pusherServer.trigger(rawFormData.roomId, 'new-message', rawFormData.content);
   console.log(formData)
   await prisma.message.create({
        data: {
            content: rawFormData.content,
            chatRoomId: rawFormData.roomId
        }
    });
}