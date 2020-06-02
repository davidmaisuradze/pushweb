import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appInputCurrency]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CurrencyValidatorDirective, multi: true }]
})
export class CurrencyValidatorDirective implements Validator {
  static currency(control: FormControl): ValidationErrors | null {
    const value = Number.parseFloat(control.value);
    if (!value) {
      return null;
    }
    if (
      Number.isNaN(value) ||
      !(value > Number.MIN_SAFE_INTEGER && value < Number.MAX_SAFE_INTEGER)
    ) {
      return {
        currency: `The value must be a valid number`
      };
    }
    return null;
  }

  validate(control: FormControl): ValidationErrors | null {
    return CurrencyValidatorDirective.currency(control);
  }
}
