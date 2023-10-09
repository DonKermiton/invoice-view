import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlStatus, FormsModule, NgModel } from '@angular/forms';
import { GenericControlValueAcc } from '@/share/forms/_generics/generic-control-value-acc';
import { InputValidation } from '../_generics/input-validation.utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends GenericControlValueAcc {
  @Input()
  public autocomplete = 'off';

  @Input()
  public type = 'text';

  @Input()
  public inputStyles: Record<string, string> = {};

  @Input()
  public validators: InputValidation | null = null;

  @ViewChild(NgModel, { static: true }) controlInput: NgModel | null = null;

  @Output()
  public valueChanges: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public statusChanges: EventEmitter<FormControlStatus> =
    new EventEmitter<FormControlStatus>();

  private destroyRef = inject(DestroyRef);

  private listenToControlChanges(): void {
    if (!this.controlInput) {
      return;
    }

    this.controlInput.control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string) => {
        this.valueChanges.next(value);
      });

    this.controlInput.control.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: FormControlStatus) => this.statusChanges.next(value));
  }
}
