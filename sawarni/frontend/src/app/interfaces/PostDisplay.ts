import { Attachment } from "./Attachment";

export interface PostDisplay {
    id : number;
    user_name : string;
    profile_picture_path : string;
    text_content : string;
    attachments : Attachment[];
    creation_date : string;
    likes_count : number;
    liked_by_users : string[];
}