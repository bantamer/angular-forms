import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-users-form-input-error',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  template: `
    @if (showErrors()) {
      @switch (true) {
        @case (!!errors()?.['required'] && !errors()?.['matDatepickerParse']) {
          <ng-container>This field is required.</ng-container>
        }
        @case (!!errors()?.['minlength']) {
          <ng-container>
            Minimum length is {{ errors()?.['minlength'].requiredLength }}
          </ng-container>
        }
        @case (!!errors()?.['dateOutOfRange']) {
          <ng-container>
            Date must be between
            {{ errors()?.['dateOutOfRange'].minDate | date: 'MM/dd/yyyy' }} and
            {{ errors()?.['dateOutOfRange'].maxDate | date: 'MM/dd/yyyy' }}
          </ng-container>
        }
        @case (!!errors()?.['matDatepickerParse']) {
          <ng-container>
            Please enter a valid date in the MM/DD/YYYY format.
          </ng-container>
        }
      }
    }
  `,
})
export class UsersFormInputErrorComponent {
  readonly errors = input<ValidationErrors | null | undefined>();
  readonly isTouched = input<boolean | undefined>();
  readonly isDirty = input<boolean | undefined>();

  showErrors = computed(
    () => !!this.errors() && (this.isTouched() || this.isDirty()),
  );
}
