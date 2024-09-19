import axios, { AxiosResponse } from "axios";
import { AggEvent, Event, Session, UpdateSessionReason, SendMessageReason, StatusType, TextbeltResponseType } from "@/types";

export const getEvents = async () => {
  const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`);
  const events: Event[] = response.data;
  return events;
}

export const getEventById = async (eventId: string) => {
  const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/${eventId}`);
  const event: Event = response.data;
  return event;
};

export const getEventWithUserSessions = async (eventId: string) => {
    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/aggregators/events/${eventId}`);
    const event: AggEvent = response.data;
    return event;
};

const generateUpdateSessionRequest = (updateReason: UpdateSessionReason) => {
    let session;
    switch(updateReason) {
        case UpdateSessionReason.SkipSession:
          session = {
            status: StatusType.Skipped,
            skippedTime: new Date().toISOString(),
            checkInTime: undefined,
          };
          break;
        case UpdateSessionReason.RenewSession:
          session = {
            status: StatusType.Waiting,
            checkInTime: new Date().toISOString(),
            skippedTime: undefined,
          };
          break;
        case UpdateSessionReason.StartSession:
          session = {
            entryTime: new Date().toISOString(),
          };
          break;
        case UpdateSessionReason.CompleteSession:
          session = {
            status: StatusType.Completed,
            exitTime: new Date().toISOString(),
          };
          break;
        default:
          session = null;
      }
      return session;
};

export const updateSession = async (sessionId: string, updateReason: UpdateSessionReason) => {
    const request = generateUpdateSessionRequest(updateReason);
    if (!request) {
        // throw err?
        return;
    };
    const response: AxiosResponse = await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessions/${sessionId}`, request);
    const session: Session = response.data;
    return session;
};

const generateSMSMessageBody = (messageReason: SendMessageReason) => {
  let message;
  switch(messageReason) {
      case SendMessageReason.Skipped:
        message = 'Sorry you couldn\'t make it! We\'ve removed you from the waiting list. If you still want a headshot, feel free to scan the code to join the waiting list again.  -The Studio Pod';
        break;
      case SendMessageReason.UpNext:
        message = 'Head on over to the studio! You\'re up next. -The Studio Pod';
        break;
      default:
        message = null;
    }
    return message;
};

export const sendSMSMessage = async (phone: string, messageReason: SendMessageReason) => {
  const message = generateSMSMessageBody(messageReason); 
  if (!message) {
    // throw err?
    return;
  }
  const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/messages`, {
    phone,
    message,
  });
  const textbeltResponse: TextbeltResponseType = response.data;
  return textbeltResponse;
};

export const removeUserSession = async (sessionId: string, phoneNumber:string, eventId: string) => {
  await sendSMSMessage(phoneNumber, SendMessageReason.Skipped);
  const eventSessionResponse: AxiosResponse = await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/${eventId}/sessions/${sessionId}`);
  const sessionResponse: AxiosResponse = await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessions/${sessionId}`);
  const result: Event = sessionResponse.data;
  return result;
};

export const notifyUser = async (sessionId: string, phoneNumber: string) => {
  await sendSMSMessage(phoneNumber, SendMessageReason.UpNext);
  console.log("notify user")
  const response: AxiosResponse = await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessions/${sessionId}`, {
    notified: true,
  });
  const session: Session = response.data;
  console.log("session", session);
  return session;
};

export const completeUserSession = async (sessionId: string) => {
  const response: AxiosResponse = await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessions/${sessionId}`, {
    status: StatusType.Completed,
    exitTime: new Date().toISOString(),
  });
  const session: Session = response.data;
  return session;
}

export const startUserSession = async (sessionId: string) => {
  const response: AxiosResponse = await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessions/${sessionId}`, {
    entryTime: new Date().toISOString(),
  });
  const session: Session = response.data;
  return session;
}