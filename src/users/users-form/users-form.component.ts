import { Component, effect, inject, input, output } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { dateInRangeValidator } from './users-form-validators/date-in-range.validator';
import { UsersFormTextInputComponent } from './users-form-input/users-form-input.component';
import { UsersFormInputErrorComponent } from './users-from-input-error/users-from-input-error.component';
import { User } from 'users/users-service';

export interface UserFormOutput {
  user: User;
  isValid: boolean;
}

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
  public userChangeEvent = output<UserFormOutput>();
  public userFormInitialValues = input<User | undefined>();
  private readonly fb = inject(NonNullableFormBuilder);

  constructor() {
    effect(() => {
      const user = this.userFormInitialValues();

      if (user) {
        this.userForm.patchValue({
          ...user,
          birthDayAt: new Date(user.birthDayAt),
        });
      }
    });

    this.userForm.valueChanges.subscribe((formValue) => {
      this.userChangeEvent.emit({
        isValid: this.userForm.valid,
        user: {
          uuid: formValue.uuid!,
          firstName: formValue.firstName ?? '',
          lastName: formValue.lastName ?? '',
          birthDayAt: formValue.birthDayAt ?? new Date(),
          accountBalance: 0,
          interval: formValue.interval ?? 500,
          deleted: false,
        },
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
}
