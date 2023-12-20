import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  standalone: true,
  imports: [],
})
export class ControlErrorComponent implements OnChanges, OnDestroy {
  @Input({ required: true })
  public control: FormControl | null = null;

  @Input()
  public customErrorFields: Record<string, string> = {};

  @Input({ required: true })
  public controlName = '';
  public errors: string[] = [];
  private sub$: Subscription | null = null;
  private defaultErrors: Record<string, string> = {
    required: '{formControlName} is required',
  };
  private errorPatterns: Record<string, string> = {};

  constructor(private cdRef: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ('control' in changes && changes['control']) {
      this.listenToErrors();
    }
    if ('customErrorFields' in changes) {
      this.mergeDefaultErrorsWithAdded();
    }
  }

  public ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  private mergeDefaultErrorsWithAdded(): void {
    this.errorPatterns = { ...this.defaultErrors, ...this.customErrorFields };
  }

  private listenToErrors(): void {
    this.sub$?.unsubscribe();
    const subRef = this.control?.valueChanges.pipe().subscribe(() => {
      const key = Object.keys(this.control?.errors || {})[0];
      this.matchKeysToError(key);
      this.cdRef.detectChanges();
    });

    this.sub$?.add(subRef);
  }

  private matchKeysToError(key: string | null): void {
    if (!key) {
      return;
    }
    if (this.errorPatterns[key]) {
      this.errors.push(
        this.errorPatterns[key].replace(
          /{formControlName}/g,
          this.controlName.toUpperCase(),
        ),
      );
    } else {
      this.errors.push('Control is invalid');
    }
  }
}
