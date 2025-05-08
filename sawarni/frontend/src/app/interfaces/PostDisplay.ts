import { Attachment } from "./Attachment";

export interface PostDisplay {
    id : number;
    username : string;
    profilePicturePath : string;
    textContent : string;
    attachments : Attachment[];
    creationDate : string;
    likeCount : number;
    likedByUsers : string[];
    likedByThisUser : boolean;
}