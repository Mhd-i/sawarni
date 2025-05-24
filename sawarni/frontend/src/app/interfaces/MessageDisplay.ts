export interface MessageDisplay{
    id : number;
    senderId : number;
    receiverId : number;
    content : string;
    sentAt : Date;
    senderUserName : string;
    senderProfilePicture : string;
}