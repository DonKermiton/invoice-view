import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { asyncScheduler } from 'rxjs';
import {
  DefaultSelectItemType,
  SelectDefaultItemComponent,
} from '@/share/forms/select/select-dropdown/select-default-item/select-default-item.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { OverlayControl } from '../../../overlay/overlayControl';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule, SelectDefaultItemComponent, FormsModule],
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

  @Input()
  //todo:: change to false
  public withSearch = false;

  // will be called only if prop withSearch is set to true
  public searchFuncRef:
    | ((item: DefaultSelectItemType<string>) => boolean)
    | null = null;

  @HostBinding('style.top')
  public top = '0px';

  @HostBinding('@animateHeightOnEnter')
  public animateOnEnter = true;

  @HostBinding('@animateHeightOnLeave')
  public animateOnLeave = true;

  public selectedElement$: WritableSignal<any> = signal(null);

  // todo::
  public customSelectItem: TemplateRef<any> | null = null;

  protected searchControl: string | null = '';

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

  protected onSearchInputChange($event: string): void {
    console.log($event);
  }

  protected itemMatchesFilter(item: DefaultSelectItemType<string>): boolean {
    if (this.searchFuncRef != null) {
      return this.searchFuncRef(item);
    }
    return true;
  }

  private closeSelect(): void {
    this.close();
  }
}
