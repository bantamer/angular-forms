import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import {
  UserFormOutput,
  UsersFormComponent,
} from 'users/users-form/users-form.component';
import { User, UsersService } from './users-service';
import { filter, map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-update-page',
  standalone: true,
  imports: [UsersFormComponent, MatButtonModule, AsyncPipe],
  template: `
    <div class="flex flex-col items-center justify-center">
      <div class="max-w-[600px] w-full">
        <app-users-form
          [initialUserForm]="userById$ | async"
          (userChange)="onUserChange($event)"
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
  public userById$ = inject(ActivatedRoute).paramMap.pipe(
    map((params) => params.get('uuid')),
    filter((uuid): uuid is string => !!uuid),
    switchMap((uuid) => this.users.getUser(uuid)),
  );

  onUserChange({ user, isValid }: UserFormOutput): void {
    this.user = user;
    this.isFormValid = isValid;
  }

  onSubmit(): void {
    this.users.editUser(this.user!);
    this.router.navigate(['/users']);
  }

  onDelete(): void {
    const uuid = this.user!.uuid;

    this.users.deleteUser(uuid);
    this.router.navigate(['/users']);
  }
}
