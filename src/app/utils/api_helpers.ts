import axios from "axios";
import { User } from "../models/User";
import { Session } from "../models/Session";
import { Event } from "../models/Event";

export const getEventWithSessionUsers = async (eventId: string) => {
    const event: Event = await axios.get(`/api/events/${eventId}`);
    return event;
}

export const createUserSession = async (eventId: string, newUser: User) => {
    // check if user exists
    let user: User = await axios.get(`/api/search/users?phone=${newUser.phone}`)
    // if user doesnt exist, create new user
    if (!user) {
        user = await axios.post('/api/users', newUser);
    }
    // create session with userId and eventId
    const session: Session = await axios.post('/api/sessions', {
        userId: user._id,
        eventId: eventId,
    });
    // add new sessionId to sessionIds array for event with eventId
    await axios.post(`/api/events/${eventId}/sessions`, {
        sessionId: session._id,
    })
    // return all data
    const event = await getEventWithSessionUsers(eventId);
    return event;
};

export const updateSession = async (sessionId: string, updatedSession: Session) => {
    const session: Session = await axios.patch(`/api/sessions/${sessionId}`, updatedSession);
    const event = await getEventWithSessionUsers(session.eventId);
    return event;
};