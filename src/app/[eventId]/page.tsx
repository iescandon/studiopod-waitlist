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

export default async function EventDetails({ params }: { params: { eventId: string } }) {
  const event: Event = await getEventById(params.eventId);
  return (
    <div className="w-full flex flex-col justify-center items-center p-16">
        <img src={event.logoUrl} alt="Studio Pod Logo" className="w-full md:max-w-[400px] lg:max-w-[500px] pb-16" />
        <QueueLists eventId={params.eventId} />
    </div>
  )
}
