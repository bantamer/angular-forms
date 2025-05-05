import { Component, input } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-users-form-input-error',
  standalone: true,
  imports: [ReactiveFormsModule, MatError],
  template: `
    @if (hasErrors && (hasTouched || hasDirty)) {
      <ng-container>
        @if (errors?.['required'] && !errors?.['matDatepickerParse']) {
          <mat-error ngProjectAs="mat-error">This field is required.</mat-error>
        }

        @if (errors?.['minlength']) {
          <mat-error ngProjectAs="mat-error">
            Minimum length is {{ errors?.['minlength'].requiredLength }}.
          </mat-error>
        }

        @if (errors?.['maxlength']) {
          <mat-error ngProjectAs="mat-error">
            Maximum length is {{ errors?.['maxlength'].requiredLength }}.
          </mat-error>
        }

        @if (errors?.['dateOutOfRange']) {
          <mat-error ngProjectAs="mat-error"
            >Date is out of valid range.</mat-error
          >
        }

        @if (errors?.['matDatepickerParse']) {
          <mat-error ngProjectAs="mat-error"
            >Please enter a valid date in the MM/DD/YYYY format.</mat-error
          >
        }
      </ng-container>
    }
  `,
})
export class UsersFormInputErrorComponent {
  control = input.required<FormControl>();

  get errors(): ValidationErrors | null {
    return this.control()?.errors ?? null;
  }

  get hasErrors(): boolean {
    return !!this.errors;
  }

  get hasTouched(): boolean {
    return this.control().touched;
  }

  get hasDirty(): boolean {
    return this.control().dirty;
  }
}
