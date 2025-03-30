export interface PostDisplay {
    id : number;
    user_name : string;
    profile_picture_path : string;
    text_content : string;
    image_url : string;
    creation_date : string;
    likes_count : number;
    liked_by_users : string[];
}