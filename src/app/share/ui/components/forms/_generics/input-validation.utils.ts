import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class InputValidation {
  public static regexpWithCustomErrorField(
    regex: RegExp,
    errorFieldName: string,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlErrors = control.errors;

      if (!controlErrors) {
        return {};
      }

      const valid = regex.test(control.value);

      return !valid ? { [errorFieldName]: control.value } : {};
    };
  }
}
