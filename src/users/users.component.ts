import { Component, effect, signal } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { UserFormComponent } from './users-form/user-form.component';
import { UserTableComponent } from './users-table/user-table.component';
import { User } from './users-service/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserFormComponent, UserTableComponent],
  template: `
    <user-form />
    <user-table />
  `,
  styleUrl: './users.component.css',
})
export class HomeComponent {}
