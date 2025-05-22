import { Injectable, Signal } from '@angular/core';
import { signal } from '@angular/core';
import { User } from './user';

@Injectable()
export class UsersServiceImplementation implements UsersService {
  private users = signal<User[]>([]);

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

@Injectable({ providedIn: 'root', useClass: UsersServiceImplementation })
export abstract class UsersService {
  abstract getUsersSignal(): Signal<User[]>;
  abstract addUser(user: User): void;
  abstract deleteUser(uuid: string): void;
}
