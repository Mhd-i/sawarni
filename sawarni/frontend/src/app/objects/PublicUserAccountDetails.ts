export class PublicUserAccountDetails {
    user_name : string = "";
    profile_picture_path : string = "";

    constructor (user_name : string, profile_picture_path : string) {
        this.user_name = user_name;
        this.profile_picture_path = profile_picture_path;
    }
}