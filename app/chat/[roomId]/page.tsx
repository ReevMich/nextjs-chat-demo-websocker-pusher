import { Card } from "@/components/ui/card";
import Messages from "@/components/Messages";
import MessageField from "@/components/MessageField"; 
import prisma from "@/lib/prisma";


interface ChatProps {
  params: {
    roomId: string;
  }
}

export default async function Chat({ params: { roomId } }: ChatProps) {
  const messages = await prisma.message.findMany({
    where: {
      chatRoomId: roomId
    }
  }) || [];

  const serializedMessages = messages.map((message) => {
    return {
      id: message.id,
      content: message.content,
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card  className="flex flex-col items-center sm:w-fit lg:min-w-[900px] min-h-[500px]">
        <div className="flex flex-row flex-1 w-full">
          <div className="flex flex-grow chat-area bg-red-300 p-4">
            <Messages initialMessages={serializedMessages} roomId={roomId} />
          </div>
          {/* <div className="flex w-[200px] chat-area bg-blue-300">
            <Users users={[]} />
          </div> */}
        </div>
        <div className="flex w-full">
          <MessageField roomId={roomId} />
        </div>
      </Card>
    </main>
  );
}

