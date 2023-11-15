import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Signal,
} from '@angular/core';
import { StepperComponent } from 'src/app/share/ui/components/stepper/stepper.component';
import { StepComponent } from 'src/app/share/ui/components/stepper/step/step.component';
import { StepperNextPageDirective } from '../../../share/ui/components/stepper/directives/stepper-next-page.directive';
import { ButtonComponent } from '../../../share/ui/components/button/button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterUserComponent } from '@/share-forms/register-user/register-user.component';
import { CreateCompanyComponent } from '@/share-forms/create-company/create-company.component';
import { I18nPipe } from '@/core/i18n/i18n.pipe';
import { JsonPipe, NgIf } from '@angular/common';
import { DividerComponent } from '../../../share/ui/components/divider/divider.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { EmailComponent } from '@/share/forms/email/email.component';
import { PasswordComponent } from '@/share/forms/password/password.component';
import { InputComponent } from '@/share/forms/input/input.component';
import { RegisterActions } from '../../store/auth.actions';
import * as AuthTypes from '../../auth.types';
import { User } from '../../auth.types';
import { UserSelectors } from '../../store/auth.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { InputValidation } from '@/share/forms/_generics/input-validation.utils';
import * as RegisterComponentTypes from './register.component.types';
import {
  userPasswordValidators,
  userValidatorsErrorFields,
} from '../../share/user-password.utils';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    StepperComponent,
    StepComponent,
    StepperNextPageDirective,
    ButtonComponent,
    ReactiveFormsModule,
    RegisterUserComponent,
    CreateCompanyComponent,
    I18nPipe,
    NgIf,
    DividerComponent,
    EmailComponent,
    PasswordComponent,
    InputComponent,
    JsonPipe,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public userDataForm: FormGroup<RegisterComponentTypes.UserForm>;
  public companyDataForm: FormGroup<RegisterComponentTypes.CompanyForm>;
  public isLoading: Signal<boolean | undefined>;
  public data: Signal<User | undefined>;

  public readonly userFormDictionary: typeof RegisterComponentTypes.UserFormDictionary =
    RegisterComponentTypes.UserFormDictionary;

  public readonly companyFormDictionary: typeof RegisterComponentTypes.CompanyFormDictionary =
    RegisterComponentTypes.CompanyFormDictionary;

  public readonly passwordCustomErrorFields: Record<string, string> =
    userValidatorsErrorFields;
  private readonly passwordValidators: ValidatorFn[] = userPasswordValidators;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions: Actions,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {
    this.isLoading = toSignal(this.store.select(UserSelectors.isPending));
    this.data = toSignal(this.store.select(UserSelectors.data));
    this.userDataForm = this.buildUserForm();
    this.companyDataForm = this.buildCompanyForm();

    this.onRegisterSuccess();
  }

  public onFormSubmit(): void {
    this.store.dispatch(
      RegisterActions.start({
        props: <AuthTypes.Register>{
          user: this.userDataForm.getRawValue(),
          company: this.companyDataForm.getRawValue(),
        },
      }),
    );
  }

  private buildUserForm(): FormGroup<RegisterComponentTypes.UserForm> {
    return this.fb.group(
      {
        [this.userFormDictionary.EMAIL]: new FormControl(
          'dumbEmail@gmail.com',
          {
            validators: [Validators.required, Validators.email],
          },
        ),
        [this.userFormDictionary.CONFIRM_EMAIL]: new FormControl(
          'dumbEmail@gmail.com',
          {
            validators: [Validators.required, Validators.email],
          },
        ),
        [this.userFormDictionary.PASSWORD]: new FormControl(
          'RandomPassword#1',
          {
            validators: [Validators.required, ...this.passwordValidators],
          },
        ),
        [this.userFormDictionary.CONFIRM_PASSWORD]: new FormControl(
          'RandomPassword#1',
          {
            validators: [Validators.required, ...this.passwordValidators],
          },
        ),
      },
      {
        updateOn: 'change',
        validators: [
          InputValidation.controlsHaveSameValue(
            this.userFormDictionary.EMAIL,
            this.userFormDictionary.CONFIRM_EMAIL,
            'different-emails',
          ),
          InputValidation.controlsHaveSameValue(
            this.userFormDictionary.PASSWORD,
            this.userFormDictionary.CONFIRM_PASSWORD,
          ),
        ],
      },
    );
  }

  private buildCompanyForm(): FormGroup<RegisterComponentTypes.CompanyForm> {
    return this.fb.group(
      {
        [this.companyFormDictionary.COMPANY_NAME]: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      { updateOn: 'change' },
    );
  }

  private onRegisterSuccess(): void {
    this.actions
      .pipe(
        ofType(RegisterActions.success),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
}
