export interface UserRequest {
  name: string;
  phone: string;
  email?: string;
};

export interface User extends UserRequest {
    _id: string;
  };
  
  export interface Session {
    _id: string;
    eventId: string;
    userId: string;
    status: string;
    checkInTime?: string;
    skippedTime?: string;
    entryTime?: string;
    exitTime?: string;
  };
  
  export interface Event {
    _id: string;
    name: string;
    logoUrl: string;
    date: string;
    sessionIds: string | undefined[];
  };

  export interface AggSession {
    _id: string;
    user: User;
    status: string;
    checkInTime?: string;
    skippedTime?: string;
    entryTime?: string;
    exitTime?: string;
  };

  export interface AggEvent {
    _id: string;
    name: string;
    logoUrl: string;
    date: string;
    waiting: AggSession[];
    completed: AggSession[];
    skipped: AggSession[];
  };

  export interface TextbeltResponseType {
    success: boolean,
    quotaRemaining?: number,
    textId?: string,
    error?: string,
  };
  
  export enum StatusType {
    Waiting = 'waiting',
    Skipped = 'skipped',
    Completed = 'completed'
  };
  
  export enum UpdateSessionReason {
    SkipSession = "skipSession",
    RenewSession = "renewSession",
    StartSession = "startSession",
    CompleteSession = "completeSession",
  };
  
  export enum SendMessageReason {
    Skipped = "skipped",
    UpNext = "upNext",
  };
  