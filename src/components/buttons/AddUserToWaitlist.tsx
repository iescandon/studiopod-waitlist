'use client'

interface ButtonProps {
eventId: string,
}

export function AddUserToWaitlistButton( { eventId }: ButtonProps ) {

  return (
    <button onClick={() => {console.log("add user to waitlist")}}>Add User</button>
  );
}
