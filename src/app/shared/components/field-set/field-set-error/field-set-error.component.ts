import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'field-set-error',
  templateUrl: './field-set-error.component.html',
  styleUrls: ['./field-set-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldSetErrorComponent implements OnInit {
  private _message$ = new BehaviorSubject(null);
  private _errors: ValidationErrors | null;

  public message$ = this._message$.asObservable();

  // we can pass custom error messages here
  @Input()
  public errorMessages = {};

  @Input() set errors(value: ValidationErrors | null) {
    this._errors = value;
    this.updateErrorMessage();
  }

  constructor() {}

  ngOnInit() {}

  private updateErrorMessage(): string | null {
    if (!this._errors) {
      return null;
    }
    // TODO: move constants to validation.messages.ts
    const messages = {
      required: () => 'This field is required',
      maxlength: () =>
        `The text entered exceeds the maximum length ${this._errors.maxlength.requiredLength}`,
      minlength: () =>
        `The field needs to be at least ${this._errors.minlength.requiredLength} characters long`,
      max: () => `The field value must be less than ${this._errors.max.max}`,
      min: () => `The field value must be greater than ${this._errors.min.min}`,
      /* the application validations   */
      file: () => this._errors.file,
      currency: () => this._errors.currency,
      unique: () => this._errors.unique,
      range: () =>
        `The field value must be between ${this._errors.range.min} and ${this._errors.range.max}`,
      url: () => this._errors.url,
      customMessage: () => this._errors.customMessage,
      email: () => 'Invalid  email  address.',
      incorrect: () => this._errors.incorrect || 'Not found.',
      pattern: () => 'The field is invalid.'
    };
    const message = Object.keys(messages).reduce((acc, key) => {
      if (!acc) {
        if (this.errorMessages.hasOwnProperty(key)) {
          return this.errorMessages[key];
        }
        if (this._errors.hasOwnProperty(key)) {
          return messages[key]();
        }
      }
      return acc;
    }, null);
    this._message$.next(message);
  }
}
