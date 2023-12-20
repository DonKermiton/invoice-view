import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayControl } from '../../../overlay/overlay.component';
import { asyncScheduler } from 'rxjs';
import { SelectDefaultItemComponent } from '@/share/forms/select/select-dropdown/select-default-item/select-default-item.component';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule, SelectDefaultItemComponent],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDropdownComponent
  extends OverlayControl
  implements AfterViewInit
{
  public items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  @HostBinding('style.top')
  public top = '0px';

  public selectedElement$: WritableSignal<any> = signal(null);

  // todo::
  public customSelectItem: TemplateRef<any> | null = null;

  @HostBinding('style.left')
  private left = '0px';
  @HostBinding('style.width')
  private width = '0px';
  private viewWasInit = false;
  private animationTime = 1000;
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  public clickedOutsideElement(target: EventTarget): void {
    if (!this.viewWasInit) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.closeSelect();
    }
  }

  public ngAfterViewInit() {
    asyncScheduler.schedule(() => {
      this.viewWasInit = true;
    }, this.animationTime);
  }

  public changeSelectPosition(rect: DOMRect) {
    this.top = rect.top + rect.height + 'px';
    this.left = rect.left + 'px';
    this.width = rect.width + 'px';

    this.cdRef.markForCheck();
  }

  public itemSelected(item: number): void {
    console.log(item);
  }

  private closeSelect(): void {
    this.destroy();
  }
}
