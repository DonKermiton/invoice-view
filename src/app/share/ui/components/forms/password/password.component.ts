import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@/share/forms/input/input.component';
import { FormsModule, Validators } from '@angular/forms';
import { GenericControlValueAcc } from '@/share/forms/_generics/genericControlValueAcc';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  merge,
  withLatestFrom,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, InputComponent, FormsModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [],
})
export class PasswordComponent
  extends GenericControlValueAcc
  implements OnInit, AfterViewInit
{
  /*
    min 8 chars
    max 30 chars
    min 1 uppercase
    min 1 Special char
   */
  public validationErrors: Map<RegExp, string> = new Map();

  private errors: BehaviorSubject<Set<string>> = new BehaviorSubject<
    Set<string>
  >(new Set());

  public inputType$: BehaviorSubject<'password' | 'text'> = new BehaviorSubject<
    'password' | 'text'
  >('password');

  private destroyRef = inject(DestroyRef);

  constructor() {
    super();
    this.validationErrors.set(/(?=.*[A-Za-z])/, 'One big letter required');
    this.validationErrors.set(/(?=.*\d)/, 'Digit required');
    this.validationErrors.set(/(?=.*[@$!%*#?&])/, 'special character required');
    this.validationErrors.set(
      /[A-Za-z\d@$!%*#?&]{8,}/,
      'at least 8 characters required',
    );
  }

  public getErrors() {
    return this.errors.pipe(map((errors) => errors.keys()));
  }

  public ngOnInit(): void {
    this.validationErrors.forEach((_value, key) => {
      this.addValidators(Validators.pattern(key));
    });
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

  public ngAfterViewInit(): void {
    this.autoToggleOffPassword();
    this.showPasswordValidations();
  }

  private showPasswordValidations(): void {
    this.control.valueChanges
      ?.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((controlValue: string) => {
        const errors = this.errors.getValue();
        this.validationErrors.forEach((value, key) => {
          if (!key.test(controlValue)) {
            if (!errors.has(value)) {
              errors.add(value);
            }
          } else {
            errors.delete(value);
          }
        });
        this.errors.next(errors);
      });
  }

  private autoToggleOffPassword(): void {
    this.control.statusChanges?.subscribe((t) => {
      console.log(t);
      this.cdRef.detectChanges();
    });
    merge(this.inputType$.pipe(debounceTime(3000)), this.control.valueChanges!)
      ?.pipe()
      .pipe(
        withLatestFrom(this.inputType$),
        filter(([_value, type]) => type === 'text'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.inputType$.next('password');
      });
  }
}
