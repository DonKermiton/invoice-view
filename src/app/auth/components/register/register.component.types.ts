import { FormControl } from '@angular/forms';

export enum UserFormDictionary {
  EMAIL = 'email',
  CONFIRM_EMAIL = 'confirmEmail',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export interface UserForm {
  [UserFormDictionary.EMAIL]: FormControl<string | null>;
  [UserFormDictionary.CONFIRM_EMAIL]: FormControl<string | null>;
  [UserFormDictionary.PASSWORD]: FormControl<string | null>;
  [UserFormDictionary.CONFIRM_PASSWORD]: FormControl<string | null>;
}

export enum CompanyFormDictionary {
  COMPANY_NAME = 'companyName',
}

export interface CompanyForm {
  [CompanyFormDictionary.COMPANY_NAME]: FormControl<string | null>;
}
