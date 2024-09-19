"use server";
import { User } from "@/types";
import axios, { AxiosResponse } from "axios";
import { z } from "zod";
import { revalidatePath } from "next/cache";

function getFirstName(fullName: string) {
  return fullName.split(' ')[0];
}


function formatPhoneNumber(phoneNumber: string) {
    const cleanNumber = phoneNumber.slice(1);
    const formattedNumber = cleanNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return formattedNumber;
}

export async function createUserSession(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
    const schema = z.object({
        eventId: z.string()
          .uuid()
          .min(1, { message: "EventId is a required field" }),
        name: z.string()
          .min(1, { message: "Name is a required field" }),
        phone: z.string()
          .min(1, { message: "Phone is a required field" })
          .transform((val) => val.trim().replace(/[+\-().\s]/g, ''))
          .refine((val) => /^[1-9]\d{1,14}$/.test(val), {
            message: 'Enter a valid phone number',
          }),
      });
      
      const parse = schema.safeParse({
        eventId: formData.get("eventId"),
        name: formData.get("name"),
        phone: formData.get("phone"),
      });

      if (!parse.success) {
        return { message: "Hmmm...something doesn't look right. Please reset the form and try again.", statusCode: 400 };
      }
    
      const data = parse.data;
  try {
    let user: User;
    let userResponse: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/search/users?phone=${data.phone}`);
    if (userResponse.data) {
        user = userResponse.data;
    } else {
        const newUserResponse: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, data);
        user = newUserResponse.data;
    }
    const sessionResponse: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessions`, {
        userId: user._id,
        eventId: data.eventId,
    });
    const eventResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/${data.eventId}/sessions`, {
        sessionId: sessionResponse.data._id,
    });
    revalidatePath(`/${data.eventId}`);
    const formattedNumber = formatPhoneNumber(data.phone);
    const firstName = getFirstName(data.name);
    return { message: `Thanks ${firstName}! You're on the waitlist. We'll send you a text at ${formattedNumber} when you're up next!`, statusCode: 201 };
  } catch (e) {
    return { message: "Ooof this is embarassing. Something went wrong. Please reset the form and try again.", statusCode: 500 };
  }
}
