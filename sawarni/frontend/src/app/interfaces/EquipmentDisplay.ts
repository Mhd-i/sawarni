import { Attachment } from "./Attachment";

export interface EquipmentDisplay {
    id: string;
    name: string;
    description : string;
    price: number;
    sellerid: number;
    sellerusername: string
    attachments: Attachment[];
  }
