"use client";

import { pusherClient } from "@/lib/pusher";
import { Message } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface MessagesProps {
  initialMessages: Pick<Message, "id" | "content">[];
  roomId: string;
}

function Messages({ initialMessages, roomId }: MessagesProps) {
  const dummyScrollRef = useRef<HTMLDivElement>(null);
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("new-message", (message: string ) => {
      setIncomingMessages((prev) => [...prev, message]);
      dummyScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => pusherClient.unsubscribe(roomId);
  }, [roomId]);

  return (
    <ScrollArea className="flex flex-1 max-h-[458px] -mr-4">
      {initialMessages.map((message) => 
        <p key={message.id}>{message.content}</p>
      )}
      {incomingMessages.map((message, index) => 
        <p key={index}>{message}</p>
      )}
      <div className="h-5 w-2" ref={dummyScrollRef} />
    </ScrollArea>
  );
}

export default Messages;
