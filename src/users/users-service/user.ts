export const UserField = {
  Uuid: 'uuid',
  FirstName: 'firstName',
  LastName: 'lastName',
  BirthDayAt: 'birthDayAt',
  AccountBalance: 'accountBalance',
  Interval: 'interval',
  Deleted: 'deleted',
} as const;

export type UserField = (typeof UserField)[keyof typeof UserField];

export interface User {
  [UserField.Uuid]: string;
  [UserField.FirstName]: string;
  [UserField.LastName]: string;
  [UserField.BirthDayAt]: Date;
  [UserField.AccountBalance]: number;
  [UserField.Interval]: number;
  [UserField.Deleted]: boolean;
}
