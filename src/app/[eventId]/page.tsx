import { getEventById, getEvents } from "@/utils";
import { Event } from "@/types";
import { QueueLists } from "@/components/lists";

export const revalidate = 1;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    eventId: event._id,
  }))
}

interface EventDetailsProps { 
  params: { 
    eventId: string 
  },
  searchParams: {
    accessCode?: string
  },
}

export default async function EventDetails({ params, searchParams }: EventDetailsProps) {
  const event: Event = await getEventById(params.eventId);
  const isAdmin: boolean = searchParams.accessCode ? (searchParams.accessCode === event.accessCode ? true : false) : false;
  return (
    <div className="w-full flex flex-col justify-center items-center p-4 md:px-16">
        <img src={event.logoUrl} alt="Studio Pod Logo" className="w-full md:max-w-[400px] lg:max-w-[500px] p-16" />
        <QueueLists eventId={params.eventId} isAdmin={isAdmin} />
    </div>
  )
}
