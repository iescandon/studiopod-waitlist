import { getEvents, getEventWithUserSessions } from "@/utils";
import { AggEvent, AggSession } from "@/types";

export const revalidate = 1;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    eventId: event._id,
  }))
}

export default async function EventDetails({ params }: { params: { eventId: string } }) {
const event: AggEvent = await getEventWithUserSessions(params.eventId);
console.log(event);
  return (
    <main>
      <h1>{event.name}</h1>
      <p>{event.date}</p>
      <ul>
      {event?.waiting?.map((session: AggSession) => (
          <li key={session._id}>{session.user.name}</li>
      ))}
    </ul>
    </main>
  )
}