import { FormGroup, FormGroupDirective } from '@angular/forms';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  inject,
} from '@angular/core';

@Directive()
export abstract class ResolveForm implements AfterViewInit {
  public form: FormGroupDirective | null;
  public formGroup: FormGroup | null = null;
  protected cdRef: ChangeDetectorRef;
  constructor() {
    this.form = inject(FormGroupDirective, { optional: true });
    this.cdRef = inject(ChangeDetectorRef);
  }

  public abstract afterViewWasInit(): void;

  public ngAfterViewInit() {
    if (!this.form) {
      console.error('component must be nested inside formGroup');
    } else {
      this.formGroup = this.form.form;
    }

    this.afterViewWasInit();
    this.formGroup?.updateValueAndValidity();
    this.cdRef.detectChanges();
  }
}
