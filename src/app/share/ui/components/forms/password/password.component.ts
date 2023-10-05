import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@/share/forms/input/input.component';
import { Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputValidation } from '../_generics/input-validation.utils';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements AfterViewInit {
  public inputType$: BehaviorSubject<'password' | 'text'> = new BehaviorSubject<
    'password' | 'text'
  >('password');
  public validation: InputValidation = new InputValidation().add([
    Validators.required,
    InputValidation.regexpWithCustomField(
      /(?=.*[A-Za-z])/,
      'bigLetterRequired',
    ),
    InputValidation.regexpWithCustomField(/(?=.*\d)/, 'missingDigit'),
    InputValidation.regexpWithCustomField(
      /(?=.*[@$!%*#?&])/,
      'specialCharMissing',
    ),
  ]);

  private destroyRef = inject(DestroyRef);

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

  public ngAfterViewInit(): void {
    this.autoToggleOffPassword();
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
}
