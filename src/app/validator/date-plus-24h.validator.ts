import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function datePlus24hValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = new Date(control.value);
    const now = new Date();

    const minDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    if (isNaN(inputDate.getTime()) || inputDate <= minDate) {
      return { dateTooSoon: true };
    }

    return null;
  };
}
