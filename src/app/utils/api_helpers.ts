import axios from "axios";
import { User, Event, Session, UpdateSessionReason, SendMessageReason, StatusType } from "@/app/types";

export const getEvents = async () => {
  const events: Event[] = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`);
  return events;
}

export const getEventWithUserSessions = async (eventId: string) => {
    const event: Event = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/${eventId}`);
    return event;
};

export const createUserSession = async (eventId: string, newUser: User) => {
    let user: User = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/search/users?phone=${newUser.phone}`);
    if (!user) {
        user = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, newUser);
    };
    const session: Session = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessions`, {
        userId: user._id,
        eventId: eventId,
    });
    await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/${eventId}/sessions`, {
        sessionId: session._id,
    });
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
    const session: Session = await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessions/${sessionId}`, request);
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
  const result = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/messages`, {
    phone,
    message,
  });
  return result;
};