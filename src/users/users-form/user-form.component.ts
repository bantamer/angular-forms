import {
  Component,
  inject,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { v4 as uuidv4 } from 'uuid';

import { DatePipe } from '@angular/common';
import { dateInRangeValidator } from './users-form-validators/date-in-range.validator';
import { UsersService } from '../users-service/users.service';

export class UserFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  private users = inject(UsersService)
  readonly matcher = new UserFormErrorStateMatcher();

  readonly userForm = new FormGroup({
    uuid: new FormControl(''),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    birthDayAt: new FormControl(null, [
      Validators.required,
      dateInRangeValidator({}),
    ]),
  });




  onSubmit(formDirective: FormGroupDirective) {
    this.users.addUser({
      uuid: uuidv4(),
      firstName: this.userForm.value['firstName'] ?? '',
      lastName: this.userForm.value['lastName'] ?? '',
      birthDayAt: this.userForm.value['birthDayAt'] ?? new Date(),
    })


    formDirective.resetForm();
    this.userForm.reset();
  }
}
