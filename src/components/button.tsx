'use client'
import { SendMessageReason } from "@/app/types";
import { sendSMSMessage } from "@/app/utils";

export default function SendMessageButton() {
  return (
<button onClick={() => {
    sendSMSMessage('+18303527507', SendMessageReason.UpNext)
   }
  }>Send Message</button>
  );
}
