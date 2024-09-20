import Link from 'next/link'
import { getEvents } from "@/utils"
import { Typography } from '@mui/material';

export const revalidate = 1;

export default async function Home() {
  const events = await getEvents();
  return (
    <div className="p-16">
    <ul>
      {events.map((event) => (
        <Link key={event._id} href={`/${event._id}`}>
            <Typography key={event._id} component="div" variant="h5">{event.name}</Typography>
        </Link>
      ))}
    </ul>
    </div>
  )
}