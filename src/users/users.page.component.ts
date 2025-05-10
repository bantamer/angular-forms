import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { UsersService } from 'users/users-service';
import { UsersTableComponent } from 'users/users-table/users-table.component';

@Component({
  selector: 'app-users-page',
  imports: [UsersTableComponent, AsyncPipe],
  template: `<app-user-table [users]="(users.getUsers$() | async) ?? []" />`,
})
export class UsersPageComponent {
  public users = inject(UsersService);
}
