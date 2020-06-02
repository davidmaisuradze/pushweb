import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyValidatorDirective } from '../directives/currency-validator.directive';
import { FileValidatorDirective } from '../directives/file-validator.directive';
import { UrlValidatorDirective } from '../directives/url-validator.directive';
import { FullEmailValidatorDirective } from '../directives/full-email-validator.directive';

export function getValidators(items) {
  if (!items) {
    return [];
  }
  return Object.keys(items).map(key => {
    switch (key) {
      case 'required':
        return Validators.required;
      case 'email':
        return Validators.email;
      case 'fullEmail':
        return FullEmailValidatorDirective.email;
      case 'maxLength':
        return Validators.maxLength(items[key]);
      case 'pattern':
        return Validators.pattern(items[key]);
      case 'minLength':
        return Validators.minLength(items[key]);
      case 'max':
        return Validators.max(items[key]);
      case 'min':
        return Validators.min(items[key]);
      case 'currency':
        return CurrencyValidatorDirective.currency;
      case 'file':
        return FileValidatorDirective.options(items[key]);
      case 'url':
        return UrlValidatorDirective.url;
      case 'urlOrEmpty':
        return UrlValidatorDirective.urlOrEmpty;
      default:
        return key.startsWith('fn') ? items[key] : Validators.nullValidator;
    }
  });
}

export function createForm(
  fb: FormBuilder,
  fields,
  model = {},
  callback?: Function
): FormGroup | null {
  if (!fields) {
    return null;
  }

  const getArray = (value = null, validators) => {
    if (!value) {
      return new FormArray([]);
    }
    value = Array.isArray(value) ? value : [value];
    return fb.array(
      value.map(item => new FormControl(item)),
      validators
    );
  };

  const getValueOrDefault = (defValue = null, value = null) => {
    return value === null ? defValue : value;
  };

  model = model || {};
  const systemFields = ['isGroup', 'isArray', 'validators', 'disabled', 'updateOn'];
  const data = fields;
  fields = fields.isGroup ? fields.fields : fields;
  return fb.group(
    Object.keys(fields)
      .filter(key => systemFields.indexOf(key) < 0)
      .reduce((acc, key) => {
        /*  set id for fieldset directive */
        fields[key].id = key;
        if (fields[key].isGroup) {
          acc[key] = createForm(fb, fields[key], model, callback);
          if (fields[key].validators) {
            acc[key].setValidators(getValidators(fields[key].validators));
          }
        } else {
          if (callback) {
            callback(key, fields[key], acc);
          }
          const propValue = getValueOrDefault(fields[key].value, model[key]);
          if (fields[key].isArray) {
            acc[key] = getArray(propValue, getValidators(fields[key].validators));
          } else {
            acc[key] = [
              {
                value: propValue,
                disabled: !!fields[key].disabled
              },
              getValidators(fields[key].validators)
            ];
          }
          return acc;
        }
        return acc;
      }, {}),
    {
      validators: getValidators(data.validators),
      updateOn: data.updateOn || 'change'
    }
  );
}

// TO DO: use Form without of model fields
export function validForm(form: FormGroup, fields) {
  if (form.invalid) {
    Object.keys(fields).forEach(key => {
      if (fields[key].isGroup) {
        validForm(form.get(key) as FormGroup, fields[key].fields);
      } else {
        if (!fields[key].hidden && !form.get(key).touched) {
          form.get(key).markAsTouched();
        }
      }
    });
  }
  return !form.invalid;
}
