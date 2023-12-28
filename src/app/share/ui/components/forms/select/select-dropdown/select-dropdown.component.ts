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
import {
  DefaultSelectItemType,
  SelectDefaultItemComponent,
} from '@/share/forms/select/select-dropdown/select-default-item/select-default-item.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule, SelectDefaultItemComponent],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animateHeightOnEnter', [
      transition(':enter', [
        style({
          height: 0,
          overflow: 'hidden',
        }),
        animate(
          '.3s ease-out',
          style({
            height: '*',
          }),
        ),
      ]),
    ]),
    trigger('animateHeightOnLeave', [
      transition(':leave', [
        style({
          height: '*',
          overflow: 'hidden',
        }),
        animate(
          '.3s ease-out',
          style({
            height: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class SelectDropdownComponent
  extends OverlayControl
  implements AfterViewInit
{
  public items: DefaultSelectItemType<string>[] = [
    { key: 'first test element', value: 'some value' },
    { key: 'second test element', value: 'some value' },
    { key: 'third test element', value: 'some value' },
    { key: 'third test element', value: 'some value' },
    { key: 'third test element', value: 'some value' },
    { key: 'third test element', value: 'some value' },
  ];

  @HostBinding('style.top')
  public top = '0px';

  @HostBinding('@animateHeightOnEnter')
  public animateOnEnter = true;

  @HostBinding('@animateHeightOnLeave')
  public animateOnLeave = true;

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

  public itemSelected(item: DefaultSelectItemType<string>): void {
    this.selectedElement$.set(item.value);
  }

  private closeSelect(): void {
    this.destroy();
  }
}
