import Link from 'next/link'
import { getEvents } from "@/utils"

export default async function Home() {
  const events = await getEvents();
  return (
    <ul>
      {events.map((event) => (
        <Link key={event._id} href={`/${event._id}`}>
            <li key={event._id}>{event.name}</li>
        </Link>
      ))}
    </ul>
  )
}