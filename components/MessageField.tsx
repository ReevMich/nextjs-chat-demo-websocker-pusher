"use client";

import { SendMessage } from "@/app/chat/[roomId]/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

interface MessageFieldProps {
  roomId: string;
}

function MessageField({ roomId }: MessageFieldProps) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={ref}
      className="flex flex-1" 
      action={async (formData) => {
        await SendMessage(formData);
        ref.current?.reset();
    }}>
      <input type="hidden" name="roomId" value={roomId} />
      <Input placeholder="Type your message here" name="content" />
      <Button type="submit">Send Message</Button>
    </form>
  );
}

export default MessageField;
