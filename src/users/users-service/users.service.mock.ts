import { Provider, signal, Signal } from '@angular/core';
import { User } from './user';
import { UsersService } from './users.service';

export class UsersServiceMock implements UsersService {
  private _users = signal<User[]>([]);

  public getUsersSignalCalls: null[] = [];
  public addUserCalls: User[] = [];
  public deleteUserCalls: string[] = [];

  getUsersSignal(): Signal<User[]> {
    this.getUsersSignalCalls.push(null);
    return this._users.asReadonly();
  }

  addUser(form: User) {
    this.addUserCalls.push(form);
  }

  deleteUser(uuid: string) {
    this.deleteUserCalls.push(uuid);
  }
}

export const MOCK_USERS_SERVICE_PROVIDER: Provider[] = [
  UsersServiceMock,
  { provide: UsersService, useExisting: UsersServiceMock },
];
