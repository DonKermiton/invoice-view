import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControlStatus,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  GenericControlValueAcc,
  GET_VALUE_ACCESSOR,
} from '@/share/forms/_generics/generic-control-value-acc';
import { InputValidation } from '../_generics/input-validation.utils';
import { ControlErrorComponent } from '../control-error/control-error.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlErrorComponent
],
  templateUrl: './input.component.html',
  providers: [GET_VALUE_ACCESSOR(InputComponent)],
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends GenericControlValueAcc {
  @Input()
  public autocomplete = 'off';

  @Input()
  public type = 'text';

  @Input()
  public label = '';

  @Input()
  public placeholder = '';

  @Input()
  public inputStyles: Record<string, string> = {};

  @Input()
  public validators: InputValidation | null = null;
}
