import { Component } from '@angular/core';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { User } from './users-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersFormComponent, UsersTableComponent],
  template: `
    <app-user-form (submitEvent)="onUserSubmit($event)" />
    <app-user-table [users]="users" (deleteUserEvent)="onUserDelete($event)" />
  `,
})
export class HomeComponent {
  users: User[] = [];

  onUserSubmit(user: User) {
    this.users = [...this.users, user];
  }

  onUserDelete(uuid: string) {
    this.users = [...this.users].filter((user) => user.uuid !== uuid);
  }
}
