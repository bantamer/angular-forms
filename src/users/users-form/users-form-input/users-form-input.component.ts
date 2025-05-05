import { Component, input } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFormInputErrorComponent } from 'users/users-form/users-from-input-error/users-from-input-error.component';

@Component({
  selector: 'app-user-form-text-input',
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        [placeholder]="placeholder()"
        [formControlName]="controlName()"
      />
      <app-users-form-input-error [control]="control()" />
    </mat-form-field>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    UsersFormInputErrorComponent,
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class UsersFormTextInputComponent {
  controlName = input.required<string>();
  control = input.required<FormControl>();
  label = input.required<string>();
  placeholder = input.required<string>();
}
