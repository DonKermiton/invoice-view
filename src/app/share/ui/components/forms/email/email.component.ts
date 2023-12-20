import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@/share/forms/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GenericControlValueAcc,
  GET_VALUE_ACCESSOR,
} from '@/share/forms/_generics/generic-control-value-acc';
import { ControlErrorComponent } from '@/share/forms/control-error/control-error.component';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    ControlErrorComponent,
  ],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  providers: [GET_VALUE_ACCESSOR(EmailComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent extends GenericControlValueAcc {
  @Input()
  public label = 'Email';
  constructor() {
    super();
  }
}
