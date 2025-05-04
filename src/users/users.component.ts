import { Component } from '@angular/core';

import { UserFormComponent } from './users-form/user-form.component';
import { UserTableComponent } from './users-table/user-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserFormComponent, UserTableComponent],
  template: `
    <app-user-form />
    <app-user-table />
  `,
})
export class HomeComponent {}
