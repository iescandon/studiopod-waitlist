'use client'
import { AggEvent, AggSession } from "@/types";
import { UserSessionCard } from "../cards";
import { useEffect, useState } from "react";
import { getEventWithUserSessions } from "@/utils";

interface EventDetailsProps {
  eventId: string;
}

export function QueueLists({ eventId }: EventDetailsProps) {
  const [event, setEvent] = useState<AggEvent>();

  const getAggEvent = async () => {
    const aggEvent = await getEventWithUserSessions(eventId);
    setEvent(aggEvent);
  }

  useEffect(() => {
    if (eventId) {
      getAggEvent()
    }
  }, [eventId])

  return (
    <>
    <div className="space-y-4">
    {event?.waiting?.map((session: AggSession, index: number) => (
        <UserSessionCard key={session._id} eventId={event._id} getAggEvent={getAggEvent} userSession={session} index={index} />
    ))}
    </div>
    </>
  );
}
