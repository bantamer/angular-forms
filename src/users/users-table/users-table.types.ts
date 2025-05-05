import { UserField } from 'users/users-service';

export const CommonTableColumn = {
  Actions: 'actions',
} as const;

export type CommonTableColumn =
  (typeof CommonTableColumn)[keyof typeof CommonTableColumn];

export const UsersTableColumn = {
  ...UserField,
  ...CommonTableColumn,
} as const;

export type UsersTableColumn =
  (typeof UsersTableColumn)[keyof typeof UsersTableColumn];
