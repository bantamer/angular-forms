import { FormControl } from '@angular/forms';
import { dateInRangeValidator } from './date-in-range.validator';

describe('dateInRangeValidator', () => {
  const validator = dateInRangeValidator({});

  it('should return null for valid date in range', () => {
    const control = new FormControl(new Date('2000-01-01'));
    expect(validator(control)).toBeNull();
  });

  it('should return error for date before minDate', () => {
    const control = new FormControl(new Date('1800-01-01'));
    expect(validator(control)).toEqual(
      jasmine.objectContaining({
        dateOutOfRange: {
          value: control.value,
          minDate: jasmine.any(Date),
          maxDate: jasmine.any(Date),
        },
      }),
    );
  });

  it('should return error for date after maxDate', () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 10);

    const control = new FormControl(future);
    expect(validator(control)).toEqual(
      jasmine.objectContaining({
        dateOutOfRange: {
          value: control.value,
          minDate: jasmine.any(Date),
          maxDate: jasmine.any(Date),
        },
      }),
    );
  });

  it('should return null for empty value', () => {
    const control = new FormControl(null);
    expect(validator(control)).toBeNull();
  });

  it('should return error for invalid date string', () => {
    const control = new FormControl('not-a-date');
    expect(validator(control)).toEqual({ invalidDate: true });
  });

  it('should allow overriding min and max dates', () => {
    const validator = dateInRangeValidator({
      minDate: new Date('2020-01-01'),
      maxDate: new Date('2020-12-31'),
    });
    const control = new FormControl(new Date('2019-12-31'));

    expect(validator(control)).toEqual(
      jasmine.objectContaining({
        dateOutOfRange: {
          value: control.value,
          minDate: jasmine.any(Date),
          maxDate: jasmine.any(Date),
        },
      }),
    );
  });
});
