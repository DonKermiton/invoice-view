import { ControlValueAccessor, NgControl } from '@angular/forms';
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

  registerOnChange(fn: (value: T) => void) {
    this.changed = fn;
  }

  registerOnTouched(fn: () => void) {
    this.touched = fn;
  }

  private touched: (value: T) => void = () => ({});

  private changed: (value: T) => void = () => ({});
}
