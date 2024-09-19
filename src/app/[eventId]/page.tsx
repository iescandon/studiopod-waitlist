import { getEvents, getEventWithUserSessions } from "@/utils";

export const revalidate = 1;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    eventId: event._id,
  }))
}

export default async function EventDetails({ params }: { params: { eventId: string } }) {
const event = await getEventWithUserSessions(params.eventId);
  return (
    <main>
      <h1>{event.name}</h1>
      <p>{event.date}</p>
    </main>
  )
}