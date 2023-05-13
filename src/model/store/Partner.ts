import {Auditable} from "@/model/store/Auditable";

export interface Partner extends Auditable {
  id: number;
  address: string;
  name: string;
  phoneNumber: string;
  type: string;
}
