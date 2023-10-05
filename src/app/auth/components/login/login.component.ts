import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@/share/forms/input/input.component';
import { EmailComponent } from '@/share/forms/email/email.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PasswordComponent } from '@/share/forms/password/password.component';
import { ButtonComponent } from '../../../share/ui/components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, delay, of } from 'rxjs';

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
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup<LoginForm>;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public onFormSubmit(): void {
    this.login();
  }

  private login(): void {
    this.loading$.next(true);

    this.authService
      .login({
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value,
      })
      .pipe(
        catchError((err) => {
          this.loading$.next(false);
          this.loginForm.setErrors({ credentialsInvalid: true });

          return of(err);
        }),
        delay(2000),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((user) => {
        console.log('teraz')
        this.store.dispatch(AuthActions.authActions.login({ user: user.data }));
      });
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }
}
