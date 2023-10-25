import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  signal,
  WritableSignal,
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
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { DividerComponent } from '../../../share/ui/components/divider/divider.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store';
import { combineLatest } from 'rxjs';
import { EmailComponent } from '@/share/forms/email/email.component';
import { PasswordComponent } from '@/share/forms/password/password.component';
import { InputComponent } from '@/share/forms/input/input.component';

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
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public userDataForm: FormGroup;
  public companyDataForm: FormGroup;
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private store: Store,
    private cdRef: ChangeDetectorRef,
  ) {
    this.userDataForm = this.buildUserForm();
    this.companyDataForm = this.buildCompanyForm();
    combineLatest([
      this.userDataForm.valueChanges,
      this.companyDataForm.valueChanges,
    ]).subscribe(() => this.cdRef.detectChanges());
  }

  public onFormSubmit(): void {
    this.isLoading.set(true);
    this.authService
      .register({
        userData: this.userDataForm.getRawValue(),
        companyData: this.companyDataForm.getRawValue(),
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) =>
          this.store.dispatch(AuthActions.authActions.login({ user })),
        error: () => this.isLoading.set(false),
        complete: () => this.isLoading.set(false),
      });
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
}
