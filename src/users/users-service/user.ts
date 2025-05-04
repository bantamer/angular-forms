import { FormControl } from '@angular/forms';

export const UserField = {
  Uuid: 'uuid',
  FirstName: 'firstName',
  LastName: 'lastName',
  BirthDayAt: 'birthDayAt',
} as const;

export type UserField = typeof UserField[keyof typeof UserField];

export interface User {
  [UserField.Uuid]: string;
  [UserField.FirstName]: string;
  [UserField.LastName]: string;
  [UserField.BirthDayAt]: Date;
}

export type UserFormModel = {
  [K in keyof User]: FormControl<User[K]>;
};
