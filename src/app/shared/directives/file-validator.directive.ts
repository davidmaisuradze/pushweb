import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';
import { VALIDATION_FILE_TYPE } from '../../core/constants/validation.constants';

export interface IFileValidation {
  size?: number;
  sizePdf?: number;
  /**
   * @value
   * Extention type.
   *
   * @returns A map of validation errors if validation fails,
   * otherwise null.
   */
  extention?(value: string): ValidationErrors | null;
}
@Directive({
  selector: 'input[type=file]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FileValidatorDirective, multi: true }]
})
export class FileValidatorDirective implements Validator {
  static validFile(fileValue: File, data?: IFileValidation): ValidationErrors {
    if (!fileValue || !data) {
      return null;
    }
    const size = data.size;
    const sizePdf = data.sizePdf;
    const isPdf = /.pdf$/g.test(fileValue.name);
    if (isPdf) {
      if (sizePdf && fileValue.size > sizePdf * 1024 * 1024) {
        return {
          file: `The file size for PDF must be less than ${sizePdf}Mb.`
        };
      }
    } else if (size && fileValue.size > size * 1024 * 1024) {
      return {
        file: `The file size for image must be less than ${size}Mb.`
      };
    }
    if (data.extention) {
      const errors = data.extention(fileValue.type);
      if (errors) {
        return {
          file: errors.message || VALIDATION_FILE_TYPE
        };
      }
    }
    return null;
  }

  static options(data: IFileValidation) {
    return function(control: FormControl): ValidationErrors | null {
      const value = control.value;
      return FileValidatorDirective.validFile(value, data);
    };
  }

  validate(control: FormControl): ValidationErrors | null {
    return FileValidatorDirective.options({} as IFileValidation)(control);
  }
}
