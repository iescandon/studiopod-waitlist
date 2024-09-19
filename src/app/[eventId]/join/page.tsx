import { getEvents, getEventById } from "@/utils";
import { AddUserToWaitlistForm } from "@/components/forms";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    eventId: event._id,
  }))
}

export default async function Join({ params }: { params: { eventId: string } }) {
  const event = await getEventById(params.eventId);
  return (
    <div className="w-full flex flex-col justify-center items-center p-4 md:px-16">
      <img src={event.logoUrl} alt="Studio Pod Logo" className="w-full max-w-[600px] p-8 md:p-16" />
      <AddUserToWaitlistForm eventId={params.eventId} />
    </div>
  )
}