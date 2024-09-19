import { getEvents } from "@/utils"

export default async function Home() {
  const events = await getEvents();
  return (
    <ul>
      {events.map((event) => (
        <li key={event._id}>{event.name}-{event._id}</li>
      ))}
    </ul>
  )
}