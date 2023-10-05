import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class InputValidation {
  private validators: ValidatorFn[] = [];

  public add(validator: ValidatorFn | ValidatorFn[]): this {
    if (Array.isArray(validator)) {
      this.validators = [...this.validators, ...validator];
    } else {
      this.validators.push(validator);
    }

    return this;
  }

  public get(): ValidatorFn[] {
    return this.validators.slice();
  }

  public static regexpWithCustomField(
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
