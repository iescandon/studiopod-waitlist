'use client'
import * as React from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography, CircularProgress, Avatar } from '@mui/material';
import { SmsRounded, CameraEnhance, Delete, CheckCircle } from '@mui/icons-material';
import { AggSession, SendMessageReason } from '@/types';
import { useEffect, useState } from 'react';
import { notifyUser, completeUserSession, removeUserSession, startUserSession, getFirstNameAndLastInitial } from '@/utils';

interface UserSessionCardProps {
    eventId: string;
    getAggEvent: () => void;
    userSession: AggSession;
    index: number;
    isAdmin: boolean;
  }

export function UserSessionCard({ eventId, getAggEvent, userSession, index, isAdmin }: UserSessionCardProps) {
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
    <Card className="flex w-full md:w-[500px] h-full relative">
        <div className="flex justify-between w-full h-full">
            <CardContent>
                <Typography component="div" variant="h5">
                    {getFirstNameAndLastInitial(userSession.user.name)}
                </Typography>
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                {userSession.entryTime ? "in studio" : (userSession.notified ? "notified" : userSession.status)}
                </Typography>
            </CardContent>
            <div className="flex items-center pr-3 space-x-2">
                { isAdmin ? 
                <>
                <IconButton sx={{ backgroundColor: '#d4ac7c', color: 'black' }} aria-label="message" disabled={loading || userSession.notified} onClick={sendMessageToNext} >
                    <SmsRounded />
                </IconButton >
                <IconButton sx={{ backgroundColor: '#d4ac7c', color: 'black'  }} aria-label="start" disabled={loading || !!userSession.entryTime} onClick={startSession} >
                    <CameraEnhance />
                </IconButton>
                <IconButton sx={{ backgroundColor: '#d4ac7c', color: 'black'  }} aria-label="completed" disabled={loading} onClick={completeSession} >
                    <CheckCircle />
                </IconButton>
                <IconButton sx={{ backgroundColor: '#d4ac7c', color: 'black'  }} aria-label="skipped" disabled={loading} onClick={removeSession} >
                    <Delete />
                </IconButton>
                </>
                :
                <Avatar sx={{ bgcolor: "#d4ac7c", color: "black" }}>{index + 1}</Avatar>
                }
            </div>
        </div>
        <div className={`${loading ? "visible" : "invisible"} absolute inset-0 w-full h-full flex justify-center items-center`}>
        <CircularProgress />
        </div>
    </Card>
  );
}