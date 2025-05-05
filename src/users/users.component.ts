import { Component, signal } from '@angular/core';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { User } from './users-service';
import { usersMock } from './users-mock/users.mock';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersFormComponent, UsersTableComponent],
  template: `
    <app-user-form (submitEvent)="onUserSubmit($event)" />
    <app-user-table
      [users]="users()"
      (deleteUserEvent)="onUserDelete($event)"
    />
  `,
})
export class HomeComponent {
  public users = signal<User[]>(usersMock);

  onUserSubmit(user: User) {
    this.users.update((users) => [...users, user]);

    console.log(this.users());
  }

  onUserDelete(uuid: string) {
    this.users.update((users) => users.filter((user) => user.uuid !== uuid));
  }
}
