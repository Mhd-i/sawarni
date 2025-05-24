import { Attachment } from "./Attachment";

export interface EquipmentDisplay {
    id : number;
    name : string;
    attachments : Attachment[];
    sellerId : number;
    sellerUserName : string;
    description : string;
    price : number;
}