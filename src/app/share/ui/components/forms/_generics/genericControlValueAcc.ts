import { ControlValueAccessor, NgControl, ValidatorFn } from '@angular/forms';
import { ChangeDetectorRef, inject } from '@angular/core';

export class GenericControlValueAcc<T = string>
  implements ControlValueAccessor
{
  public control: NgControl;
  public cdRef: ChangeDetectorRef;
  private innerValue: T | null = null;

  constructor() {
    this.control = inject(NgControl);
    this.control.valueAccessor = this;
    this.cdRef = inject(ChangeDetectorRef);
    this.control.valueChanges?.subscribe(() => {
      console.log(this.control.errors);
    });
  }

  public get invalid(): boolean {
    return this.control ? this.control.invalid! : false;
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? (dirty || touched)! : false;
  }

  get value(): T | null {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed(value);
    }
  }

  writeValue(value: T) {
    this.innerValue = value;
  }

  public addValidators(validators: ValidatorFn | ValidatorFn[]): void {
    this.control.control?.addValidators(validators);
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed = fn;
  }

  registerOnTouched(fn: () => void) {
    this.touched = fn;
  }

  private touched: (value: T) => void = () => ({});

  private changed: (value: T) => void = () => ({});
}
