import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  UserFormOutput,
  UsersFormComponent,
} from 'users/users-form/users-form.component';
import { User, UsersService } from './users-service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-users-create-page',
  standalone: true,
  imports: [UsersFormComponent, MatButtonModule],
  template: `
    <div class="flex flex-col items-center justify-center">
      <div class="max-w-[600px] w-full">
        <app-users-form (userChangeEvent)="onUserChange($event)" />
        <button
          mat-raised-button
          (click)="onSubmit()"
          [disabled]="!isFormValid"
        >
          Create User
        </button>
      </div>
    </div>
  `,
})
export class UsersCreatePageComponent {
  private user: User | undefined;
  public isFormValid = false;
  private users = inject(UsersService);
  private router = inject(Router);

  onUserChange({ user, isValid }: UserFormOutput): void {
    this.user = {
      ...user,
      uuid: uuidv4(),
    };
    this.isFormValid = isValid;
  }

  onSubmit(): void {
    this.users.addUser(this.user!);

    this.router.navigate(['/users']);
  }
}
