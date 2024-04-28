export interface ITag {
  title: string;
  isPin: boolean;
  id: string;
  createdOn: string;
  modifiedOn: string | null;
  createdBy: string | null;
  modifiedBy: string | null;
}
