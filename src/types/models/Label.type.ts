export interface LabelI {
  title: string | undefined;
  isPin: boolean | undefined;
  id: string | undefined;
  createdOn: string | undefined;
  modifiedOn: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;
}

export interface TagI {
  title: string;
  isPin: boolean;
}
