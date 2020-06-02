import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appOnlyUrl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidatorDirective,
      multi: true
    }
  ]
})
export class UrlValidatorDirective implements Validator {
  static url(control: FormControl): ValidationErrors | null {
    // url encoding: https://developers.google.com/maps/documentation/urls/url-encoding
    const URL_REGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@%!\$&'\(\)\*\+,;=.]+$/i;
    return URL_REGEXP.test(control.value)
      ? null
      : {
          url: 'This value should be a valid URL'
        };
  }

  static urlOrEmpty(control: FormControl): ValidationErrors | null {
    return control.value ? UrlValidatorDirective.url(control) : null;
  }

  validate(control: FormControl): ValidationErrors | null {
    return UrlValidatorDirective.url(control);
  }
}
