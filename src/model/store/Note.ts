import {Auditable} from "@/model/store/Auditable";

export interface UpdateNote {
  id: number | string;
  title: string;
  content: string;
}

export interface CreateNote {
  title: string;
  content: string;
  partnerId: number | string;
}

export interface Note extends Auditable {
  id: number;
  title: string;
  content: string;
  partnerId: number;
}
