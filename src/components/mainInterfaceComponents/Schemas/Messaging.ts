
interface Members {
    senderId : string,
    receiverId : string,
}

export interface Chat {
    conversationId : string,
    members : Members,
    lastmessage : string,
    read : boolean,
    timestamp : Date,
}

export interface Message {
    name : string,
    message : string,
    timestamp : Date,
}
