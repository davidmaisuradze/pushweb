import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[fullEmail][ngModel],[fullEmail][formControl]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FullEmailValidatorDirective, multi: true }]
})
export class FullEmailValidatorDirective implements Validator {
  static email(control: FormControl): ValidationErrors | null {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;
    return !control.value || EMAIL_REGEXP.test(control.value)
      ? null
      : {
          email: {
            valid: false
          }
        };
  }

  validate(control: FormControl): ValidationErrors | null {
    return FullEmailValidatorDirective.email(control);
  }
}
