import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GenericControlValueAcc,
  GET_VALUE_ACCESSOR,
} from '@/share/forms/_generics/generic-control-value-acc';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from '@/share/forms/control-error/control-error.component';
import { OverlayService } from '../../overlay/overlay.service';
import { SelectDropdownComponent } from '@/share/forms/select/select-dropdown/select-dropdown.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlErrorComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [GET_VALUE_ACCESSOR(SelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends GenericControlValueAcc {
  @Input()
  public label = 'Email';

  constructor(private overlay: OverlayService) {
    super();
  }

  public onInputClick($event: MouseEvent) {
    const rect: DOMRect = (
      $event.target as HTMLElement
    ).getBoundingClientRect();

    this.openOverlay(rect);
  }

  private openOverlay(rect: DOMRect): void {
    const component = this.overlay.openOverlay<SelectDropdownComponent>({
      component: SelectDropdownComponent,
    });

    if (component) {
      component.instance.changeSelectPosition(rect);
    }
  }
}
