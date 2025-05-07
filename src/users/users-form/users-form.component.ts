import { Component, inject, output } from '@angular/core';
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
import { MatIcon } from '@angular/material/icon';
import { User, UserField } from 'users/users-service';

@Component({
  selector: 'app-user-form',
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
    MatIcon,
  ],
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent {
  readonly submitEvent = output<User>();

  private readonly fb = inject(NonNullableFormBuilder);

  readonly userForm = this.fb.group({
    uuid: this.fb.control<string>(''),
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
    this.submitEvent.emit({
      uuid: uuidv4(),
      firstName: this.userForm.value[UserField.FirstName] ?? '',
      lastName: this.userForm.value[UserField.LastName] ?? '',
      birthDayAt: this.userForm.value[UserField.BirthDayAt] ?? new Date(),
      accountBalance: 0,
      interval: this.userForm.value[UserField.Interval] ?? 500,
    });

    formDirective.resetForm();
    this.userForm.reset();
  }
}
