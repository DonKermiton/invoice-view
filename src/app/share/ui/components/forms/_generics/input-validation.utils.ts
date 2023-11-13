import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class InputValidation {
  public static regexpWithCustomErrorField(
    regex: RegExp,
    errorFieldName: string,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = regex.test(control.value);

      return !valid ? { [errorFieldName]: control.value } : null;
    };
  }

  public static controlsHaveSameValue(
    firstControlName: string,
    secondControlName: string,
    customErrorField = 'Controls have different values',
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControlValue: string =
        control.get(firstControlName)?.value || '';
      const confirmPasswordControlValue: string =
        control.get(secondControlName)?.value || '';

      if (!passwordControlValue || !confirmPasswordControlValue) {
        return {};
      }

      const valid = passwordControlValue === confirmPasswordControlValue;
      return !valid ? { [customErrorField]: confirmPasswordControlValue } : {};
    };
  }
}
