import { Component, input } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFormInputErrorComponent } from 'users/users-form/users-from-input-error/users-from-input-error.component';

@Component({
  selector: 'app-users-form-text-input',
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        [placeholder]="placeholder()"
        [formControlName]="controlName()"
      />
      <mat-error>
        <app-users-form-input-error
          [errors]="control().errors"
          [isTouched]="control().touched"
          [isDirty]="control().dirty"
        />
      </mat-error>
    </mat-form-field>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    UsersFormInputErrorComponent,
    MatError,
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class UsersFormTextInputComponent {
  readonly controlName = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly label = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly type = input<HTMLInputElement['type']>();
}
