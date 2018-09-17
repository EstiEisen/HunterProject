export class Contact {
  id: number;
  entityTypeId: number;
  nameEntity: string;
  entityType: EntityTypes;
  firstName: string;
  lastName: string;
  phone: string;
  mobile: string;
  email: string;
  role: string;
  selectOption:number[];
}

export enum EntityTypes {
  Employer = 0,
  Agent = 1,
  Manufacturer = 3
}
