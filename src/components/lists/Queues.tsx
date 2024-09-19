'use client'
import { AggEvent, AggSession } from "@/types";
import { UserSessionCard } from "../cards";
import { useEffect, useState } from "react";
import { getEventWithUserSessions } from "@/utils";
import { CircularProgress, Typography } from "@mui/material";

interface EventDetailsProps {
  eventId: string;
  isAdmin: boolean;
}

export function QueueLists({ eventId, isAdmin }: EventDetailsProps) {
  const [event, setEvent] = useState<AggEvent | undefined>();

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
{!event?.waiting || (Array.isArray(event?.waiting) && event?.waiting.length === 0) ? (
  <div className="w-full h-full flex justify-center items-center">
    {event?.waiting === undefined ? (
      <CircularProgress />
    ) : (
      <Typography component="div" variant="h5">Waitlist is empty</Typography>
    )}
  </div>
) : (
  <div className="space-y-4 w-full flex flex-col items-center">
    {event?.waiting.map((session: AggSession, index: number) => (
      <UserSessionCard
        key={session._id}
        eventId={event._id}
        getAggEvent={getAggEvent}
        userSession={session}
        index={index}
        isAdmin={isAdmin}
      />
    ))}
  </div>
)}
    </>
  );
}
