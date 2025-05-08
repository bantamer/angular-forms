import { Component } from '@angular/core';

import { UsersFormComponent } from 'users/users-form/users-form.component';

@Component({
  selector: 'app-users-update-page',
  standalone: true,
  imports: [UsersFormComponent],
  template: `<app-users-form />`,
})
export class UsersUpdatePageComponent {}
