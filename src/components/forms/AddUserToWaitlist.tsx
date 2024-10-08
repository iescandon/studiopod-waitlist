"use client";
// import { useActionState } from "react";
import { useState, useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { createUserSession } from "@/app/actions";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhoneInput, NameInput } from "../inputs";
import Link from "next/link";

interface SubmitButtonProps {
  isDisabled: boolean,
}

interface AddUserToWaitlistFormProps {
  eventId: string,
}

const initialState = {
  message: "",
  statusCode: 0,
};

function SubmitButton({ isDisabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <LoadingButton sx={{ marginTop: "1rem", fontWeight: 700 }} type="submit" variant="contained" loading={pending} disabled={isDisabled} className="w-[160px]">
      Let&apos;s go!
    </LoadingButton>
  );
}

export function AddUserToWaitlistForm({ eventId }: AddUserToWaitlistFormProps) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  // FIXME: useActionState isnt working with this version of next
  // https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/add-form.tsx
  // https://stackoverflow.com/questions/78445719/error-0-react-webpack-imported-module-1-useactionstate-is-not-a-function
  const [state, formAction] = useFormState(createUserSession, initialState);

  const resetForm = () => {
    setName("");
    setPhone("");
    setIsValidName(true);
    setIsValidPhone(true);
    setIsFormSubmitted(false);
  }

  useEffect(() => {
    const isSubmitted = state.message === "" ? false : true;
    setIsFormSubmitted(isSubmitted)
  }, [state])

  return (
    <>
    {!isFormSubmitted ? 
    <>
    <Typography className="pb-4 text-2xl" component="div" variant="h5">Join the waitlist!</Typography>
    {/* https://stackoverflow.com/questions/78576703/pass-variable-into-server-action-form-nextjs-14 */}
    <form action={formAction} className="flex flex-col justify-center items-center">
      <div className="space-y-4 flex flex-col items-center">
        <NameInput name={name} setName={setName} isValidName={isValidName} setIsValidName={setIsValidName} />
        <PhoneInput phone={phone} setPhone={setPhone} isValidPhone={isValidPhone} setIsValidPhone={setIsValidPhone} />
        <input
          type="hidden"
          name="eventId"
          value={eventId}
        />
      </div>
       <SubmitButton isDisabled={!isValidName || !isValidPhone || name === "" || phone === ""} />
    </form>
    </>
    : <div className="text-center space-y-4">
      <Typography className="pb-8 md:pb-4" component="div" variant="h5">{state.message}</Typography>
      {
        state.statusCode === 201 ? 
        <Link href={`/${eventId}`}>
           <Button sx={{ fontWeight: 700 }} variant="contained" className="w-[200px]">
             View waitlist here
           </Button>
        </Link> 
        : <Button sx={{ fontWeight: 700 }} variant="contained" className="w-[200px]" onClick={resetForm}>Reset Form</Button>
        
      }
    </div>
  }
    </>
  );
}