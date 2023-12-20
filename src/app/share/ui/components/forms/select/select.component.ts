import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GenericControlValueAcc,
  GET_VALUE_ACCESSOR,
} from '@/share/forms/_generics/generic-control-value-acc';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [GET_VALUE_ACCESSOR(SelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends GenericControlValueAcc {}
