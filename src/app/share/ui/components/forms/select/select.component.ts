import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  effect,
  Injector,
  Input,
  signal,
  WritableSignal,
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
  public component: ComponentRef<SelectDropdownComponent> | null = null;
  public isFocused$: WritableSignal<boolean> = signal(false);

  constructor(
    private overlay: OverlayService,
    private injector: Injector,
  ) {
    super();
  }

  public onInputClick($event: MouseEvent) {
    if (this.component) {
      this.component.instance.close();
      return;
    }

    const rect: DOMRect = (
      $event.target as HTMLElement
    ).getBoundingClientRect();

    this.openOverlay(rect);
  }

  private openOverlay(rect: DOMRect): void {
    this.component =
      this.overlay.openOverlay<SelectDropdownComponent>({
        component: SelectDropdownComponent,
      }) || null;

    if (this.formControl?.value) {
      this.component?.instance.selectedElement$.set(this.formControl.value);
    }

    if (this.component) {
      this.component.instance.changeSelectPosition(rect);
      effect(
        () => {
          const value = this.component?.instance.selectedElement$();

          const prevValue = this.value;

          if (value != prevValue) {
            this.value = value;
            this.component?.instance.close();
          }
        },
        { injector: this.injector },
      );
    }

    this.component?.instance.viewInstance.onDestroy(() => {
      this.component = null;
      this.cdRef.detectChanges();
    });
  }

  public onFocusIn(): void {
    this.isFocused$.set(true);
  }

  public onBlur(): void {
    this.isFocused$.set(false);
  }
}
