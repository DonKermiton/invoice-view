import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@/share/forms/input/input.component';
import { EmailComponent } from '@/share/forms/email/email.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PasswordComponent } from '@/share/forms/password/password.component';
import { ButtonComponent } from '../../../share/ui/components/button/button.component';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Animations } from '@/share/animations/index';
import { ManualLoginActions } from '../../store/auth.actions';
import { RouterLink } from '@angular/router';
import {
  userPasswordValidators,
  userValidatorsErrorFields,
} from '../../share/user-password.utils';

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    EmailComponent,
    ReactiveFormsModule,
    PasswordComponent,
    ButtonComponent,
    RouterLink
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.fadeOnEnter],
})
export class LoginComponent implements OnInit {
  @HostBinding('@fadeOnEnter')
  public animationOnEnter = true;

  public loginForm!: FormGroup<LoginForm>;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  public readonly passwordCustomErrorFields: Record<string, string> =
    userValidatorsErrorFields;
  private readonly passwordValidators: ValidatorFn[] = userPasswordValidators;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public onFormSubmit(): void {
    this.login();
  }

  public login(): void {
    const emailFormValue: string | null =
      this.loginForm.get('email')?.value || null;
    const passwordFormValue: string | null =
      this.loginForm.get('password')?.value || null;

    if (!emailFormValue || !passwordFormValue) {
      return;
    }

    this.store.dispatch(
      ManualLoginActions.start({
        props: { email: emailFormValue, password: passwordFormValue },
      }),
    );
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('TestTest@test.com', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('TestTest#1', {
          nonNullable: true,
          validators: [Validators.required, ...this.passwordValidators],
        }),
      },
      { updateOn: 'change' },
    );
  }
}
