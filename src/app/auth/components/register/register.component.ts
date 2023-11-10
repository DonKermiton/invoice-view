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
  public userDataForm: FormGroup;
  public companyDataForm: FormGroup;
  public isLoading: Signal<boolean | undefined>;
  public data: Signal<User | undefined>;

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

  private buildUserForm(): FormGroup {
    return this.fb.group(
      {
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
        }),
        confirmEmail: new FormControl('', {
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', { validators: [Validators.required] }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      { updateOn: 'change' },
    );
  }

  private buildCompanyForm(): FormGroup {
    return this.fb.group(
      {
        companyName: new FormControl('', {
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
