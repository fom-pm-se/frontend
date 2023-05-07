export interface Auditable {
  createdByUsername: string;
  updatedByUsername: string;
  creationTime: Date;
  updateTime: Date;
}
