import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@/share/forms/input/input.component';
import { ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  GenericControlValueAcc,
  GET_VALUE_ACCESSOR,
} from '@/share/forms/_generics/generic-control-value-acc';
import { InputValidation } from '@/share/forms/_generics/input-validation.utils';
import { ControlErrorComponent } from '@/share/forms/control-error/control-error.component';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    ControlErrorComponent,
  ],
  providers: [GET_VALUE_ACCESSOR(PasswordComponent)],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent
  extends GenericControlValueAcc
  implements OnInit
{
  @Input()
  public label = 'Password';

  @Input()
  public showForgotPassword = false;

  @Input()
  public showPasswordVisible = false;

  public inputType$: BehaviorSubject<'password' | 'text'> = new BehaviorSubject<
    'password' | 'text'
  >('password');
  public readonly validatorsCustomFields: Record<string, string> = {
    bigLetterRequired: 'One uppercase letter is required',
    missingDigit: 'One digit is required',
    specialCharMissing: 'One of @$!%*#?& chars is required',
  };
  private readonly validators: ValidatorFn[] = [
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
  private destroyRef = inject(DestroyRef);

  public ngOnInit() {
    this.autoToggleOffPassword();
    this.togglePasswordOnTyping();
    this.afterViewInit = this.attachValidators;
  }

  public showPassword(): void {
    switch (this.inputType$.getValue()) {
      case 'password':
        this.inputType$.next('text');
        break;
      case 'text':
        this.inputType$.next('password');
        break;
    }
  }

  public hidePassword(): void {
    if (this.inputType$.getValue() === 'text') {
      this.inputType$.next('password');
    }
  }

  private autoToggleOffPassword(): void {
    this.inputType$
      .pipe(
        debounceTime(2000),
        filter((type) => type === 'text'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.inputType$.next('password');
      });
  }

  private togglePasswordOnTyping(): void {
    this.formControl?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.hidePassword());
  }

  private attachValidators(): void {
    this.formControl?.addValidators(this.validators);
  }
}
