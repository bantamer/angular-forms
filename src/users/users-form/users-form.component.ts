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

import { DatePipe } from '@angular/common';
import { dateInRangeValidator } from './users-form-validators/date-in-range.validator';
import { UsersService } from 'users/users-service/users.service';
import { UsersFormTextInputComponent } from './users-form-input/users-form-input.component';
import { UsersFormInputErrorComponent } from './users-from-input-error/users-from-input-error.component';

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
    DatePipe,
    UsersFormTextInputComponent,
    UsersFormInputErrorComponent,
  ],
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent {
  private users = inject(UsersService);
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
  });

  onSubmit(formDirective: FormGroupDirective) {
    this.users.addUser({
      uuid: uuidv4(),
      firstName: this.userForm.value['firstName'] ?? '',
      lastName: this.userForm.value['lastName'] ?? '',
      birthDayAt: this.userForm.value['birthDayAt'] ?? new Date(),
    });

    formDirective.resetForm();
    this.userForm.reset();
  }
}
