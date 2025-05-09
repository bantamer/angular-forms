import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import {
  UserFormOutput,
  UsersFormComponent,
} from 'users/users-form/users-form.component';
import { User, UsersService } from './users-service';
import { filter, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-users-update-page',
  standalone: true,
  imports: [UsersFormComponent, MatButtonModule],
  template: `
    <div class="flex flex-col items-center justify-center">
      <div class="max-w-[600px] w-full">
        <app-users-form
          [userFormInitialValues]="user"
          (userChangeEvent)="onUserChange($event)"
        />
        <div class="flex gap-2">
          <button
            mat-raised-button
            (click)="onSubmit()"
            [disabled]="!isFormValid"
          >
            Update User
          </button>
          <button mat-flat-button (click)="onDelete()">Delete User</button>
        </div>
      </div>
    </div>
  `,
})
export class UsersUpdatePageComponent {
  public user: User | undefined;
  public isFormValid = false;
  private users = inject(UsersService);
  private router = inject(Router);

  constructor() {
    inject(ActivatedRoute)
      .paramMap.pipe(
        map((params) => params.get('uuid')),
        filter((uuid): uuid is string => !!uuid),
        switchMap((uuid) => this.users.getUser(uuid)),
        take(1),
      )
      .subscribe((user) => {
        console.log(user);

        this.user = user;
      });
  }

  onUserChange({ user, isValid }: UserFormOutput): void {
    this.user = user;
    this.isFormValid = isValid;
  }

  onSubmit(): void {
    this.users.editUser(this.user!);
    this.router.navigate(['/users']);
  }

  onDelete(): void {
    const uuid = this.user?.uuid;

    if (!uuid) {
      return;
    }

    this.users.deleteUser(uuid);
    this.router.navigate(['/users']);
  }
}
