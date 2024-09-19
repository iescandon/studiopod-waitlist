  export interface UserRequest {
    name: string;
    phone: string;
    email?: string;
  };

  export interface User extends UserRequest {
      _id: string;
    };

  export interface BaseSession {
    _id: string;
    status: string;
    notified: boolean;
    checkInTime?: string;
    skippedTime?: string;
    entryTime?: string;
    exitTime?: string;
  }
    
  export interface Session extends BaseSession {
    eventId: string;
    userId: string;
  };
  
  export interface AggSession extends BaseSession {
    user: User;
  };

  export interface BaseEvent {
    _id: string;
    name: string;
    logoUrl: string;
    accessCode: string;
    date: string;
  }

  export interface Event extends BaseEvent {
    sessionIds: string | undefined[];
  };


  export interface AggEvent extends BaseEvent {
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
    Completed = 'completed',
    UpNext = "up-next",
    Notified = "notified",
    InStudio = "in-studio",
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
  