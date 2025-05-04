import { Injectable, signal } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = signal<User[]>([]);

  constructor() {}

  getUsersSignal() {
    return this.users.asReadonly();
  }

  addUser(form: User): void {
    this.users.update((users) => [...users, form]);
  }

  deleteUser(uuid: string): void {
    this.users.update((users) => users.filter((user) => user.uuid !== uuid));
  }
}
