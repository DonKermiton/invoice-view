import { ValidatorFn } from '@angular/forms';
import { InputValidation } from '@/share/forms/_generics/input-validation.utils';

export const userValidatorsErrorFields: Record<string, string> = {
  bigLetterRequired: 'One uppercase letter is required',
  missingDigit: 'One digit is required',
  specialCharMissing: 'One of @$!%*#?& chars is required',
};

export const userPasswordValidators: ValidatorFn[] = [
  InputValidation.regexpWithCustomErrorField(
    /(?=.*[A-Za-z])/,
    'bigLetterRequired',
  ),
  InputValidation.regexpWithCustomErrorField(/(?=.*\d)/, 'missingDigit'),
  InputValidation.regexpWithCustomErrorField(
    /(?=.*[@$!%*#?&])/,
    'specialCharMissing',
  ),
];
