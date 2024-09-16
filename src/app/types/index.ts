export interface User {
    _id: string;
    name: string;
    phone: string;
    email?: string;
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
    date: string;
    sessionIds: string | undefined[];
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
  