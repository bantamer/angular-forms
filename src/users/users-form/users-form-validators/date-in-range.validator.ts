import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const MIN_DATE = 'Fri Apr 20 1900 00:00:00 GMT';

export const dateInRangeValidator = ({
  minDate = new Date(MIN_DATE),
  maxDate = new Date(),
}: {
  minDate?: Date;
  maxDate?: Date;
}): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const valueDate = new Date(control.value);

    if (isNaN(valueDate.getTime())) {
      return { invalidDate: true };
    }

    return valueDate >= minDate && valueDate <= maxDate
      ? null
      : { dateOutOfRange: { value: control.value, minDate, maxDate } };
  };
};
