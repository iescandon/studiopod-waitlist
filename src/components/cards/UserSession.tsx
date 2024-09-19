'use client'
import * as React from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography, CircularProgress } from '@mui/material';
import { SmsRounded, CameraEnhance, Delete, CheckCircle } from '@mui/icons-material';
import { AggSession, SendMessageReason } from '@/types';
import { useEffect, useState } from 'react';
import { notifyUser, completeUserSession, removeUserSession, startUserSession } from '@/utils';

interface UserSessionCardProps {
    eventId: string;
    getAggEvent: () => void;
    userSession: AggSession;
    index: number;
  }

export function UserSessionCard({ eventId, getAggEvent, userSession, index }: UserSessionCardProps) {
    const [loading, setLoading] = useState(false)

    const sendMessageToNext = async () => {
        setLoading(true)
        await notifyUser(userSession._id, userSession.user.phone)
        await getAggEvent();
        setLoading(false)
    };

    const startSession = async () => {
        setLoading(true)
        await startUserSession(userSession._id)
        await getAggEvent();
        setLoading(false)
    }

    const completeSession = async () => {
        setLoading(true)
        await completeUserSession(userSession._id);
        await getAggEvent();
        setLoading(false)
    }

    const removeSession = async () => {
        setLoading(true)
        await removeUserSession(userSession._id, userSession.user.phone, eventId);
        await getAggEvent();
        setLoading(false)
    }

  return (
    <Card className="flex w-full md:w-[400px] h-full relative">
        <div className="flex justify-between w-full h-full">
            <CardContent>
                <Typography component="div" variant="h5">
                    {userSession.user.name}
                </Typography>
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                {userSession.entryTime ? "in studio" : (userSession.notified ? "notified" : userSession.status)}
                </Typography>
            </CardContent>
            <div className="flex items-center pr-2">
            <IconButton aria-label="message" disabled={loading || userSession.notified} onClick={sendMessageToNext} >
                <SmsRounded />
            </IconButton>
            <IconButton aria-label="start" disabled={loading || !!userSession.entryTime} onClick={startSession} >
                <CameraEnhance />
            </IconButton>
            <IconButton aria-label="completed" disabled={loading} onClick={completeSession} >
                <CheckCircle />
            </IconButton>
            <IconButton aria-label="skipped" disabled={loading} onClick={removeSession} >
                <Delete />
            </IconButton>
            </div>
        </div>
        <div className={`${loading ? "visible" : "invisible"} absolute inset-0 bg-black opacity-20 w-full h-full flex justify-center items-center`}>
        <CircularProgress />
        </div>
    </Card>
  );
}