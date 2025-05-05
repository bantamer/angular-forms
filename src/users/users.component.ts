import { Component } from '@angular/core';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersFormComponent, UsersTableComponent],
  template: `
    <app-user-form />
    <app-user-table />
  `,
})
export class HomeComponent {}
