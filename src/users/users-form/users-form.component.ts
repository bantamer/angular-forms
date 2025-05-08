import { Component, inject } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormGroupDirective,
  NonNullableFormBuilder,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { v4 as uuidv4 } from 'uuid';

import { dateInRangeValidator } from './users-form-validators/date-in-range.validator';
import { UsersFormTextInputComponent } from './users-form-input/users-form-input.component';
import { UsersFormInputErrorComponent } from './users-from-input-error/users-from-input-error.component';

import { UserField, UsersService } from 'users/users-service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    UsersFormTextInputComponent,
    UsersFormInputErrorComponent,
  ],
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private users = inject(UsersService);
  public isEditPage = false;
  private readonly fb = inject(NonNullableFormBuilder);

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('uuid')),
        filter((uuid): uuid is string => !!uuid),
        switchMap((uuid) => this.users.getUser(uuid)),
        take(1),
      )
      .subscribe((user) => {
        if (!user) {
          this.router.navigate(['not-found']);
          return;
        }

        this.isEditPage = true;
        this.userForm.patchValue({
          uuid: user.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          birthDayAt: new Date(user.birthDayAt),
          interval: user.interval,
        });
      });
  }

  readonly userForm = this.fb.group({
    uuid: this.fb.control<string | undefined>(undefined),
    firstName: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    lastName: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    birthDayAt: this.fb.control<Date>(new Date(), {
      validators: [Validators.required, dateInRangeValidator({})],
    }),
    interval: this.fb.control<number>(500),
  });

  onSubmit(formDirective: FormGroupDirective): void {
    console.log(this.userForm.value[UserField.Uuid] ?? uuidv4());

    this.users.addUser({
      uuid: this.userForm.value[UserField.Uuid] ?? uuidv4(),
      firstName: this.userForm.value[UserField.FirstName] ?? '',
      lastName: this.userForm.value[UserField.LastName] ?? '',
      birthDayAt: this.userForm.value[UserField.BirthDayAt] ?? new Date(),
      accountBalance: 0,
      interval: this.userForm.value[UserField.Interval] ?? 500,
      deleted: false,
    });

    formDirective.resetForm();
    this.userForm.reset();
    this.router.navigate(['/users']);
  }

  onDelete(): void {
    const uuid = this.userForm.value[UserField.Uuid];
    if (!uuid) {
      return;
    }

    this.users.deleteUser(uuid);
    this.router.navigate(['/users']);
  }
}
