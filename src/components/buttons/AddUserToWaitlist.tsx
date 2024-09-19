'use client'
import { createUserSession } from "@/utils";

interface ButtonProps {
eventId: string,
}

export function AddUserToWaitlistButton( { eventId }: ButtonProps ) {
  const addUserToWaitlist = async () => {
    // save without +
    const newUser = {
      name: "Lucky",
      phone: "17134567891"
    };
    await createUserSession(eventId, newUser);
  }

  return (
    <button onClick={() => {console.log("add user to waitlist")}}>Add User</button>
  );
}
