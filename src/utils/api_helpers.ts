import axios, { AxiosResponse } from "axios";
import { UserRequest, Event, Session, UpdateSessionReason, SendMessageReason, StatusType, TextbeltResponseType, User } from "@/types";

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
    const event: Event = response.data;
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
        message = 'Sorry you couldn\'t make it! Come see the attendant if you want to get moved back to the waiting list. -The Studio Pod';
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