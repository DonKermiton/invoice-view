import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { NotificationDimensionChangeEvent } from './notification.utils';

@Directive({
  selector: '[appNotificationDimension]',
  standalone: true,
})
export class NotificationDimensionDirective implements AfterViewInit {
  @Input({ required: true })
  public index!: number;

  @Output()
  public heightChange: EventEmitter<NotificationDimensionChangeEvent> =
    new EventEmitter<NotificationDimensionChangeEvent>();

  private elementRef: ElementRef<any> = inject(ElementRef<any>);

  public ngAfterViewInit(): void {
    const resize = new ResizeObserver((e) => {
      const notificationRect = e[0];

      if (notificationRect) {
        this.heightChange.emit({
          index: this.index,
          newHeight: notificationRect.contentRect.height,
        });
      }
    });

    resize.observe(this.elementRef.nativeElement);
  }
}
