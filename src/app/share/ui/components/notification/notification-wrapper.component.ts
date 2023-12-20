import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  QueryList,
  signal,
  Signal,
  ViewChildren,
  WritableSignal
} from '@angular/core';
import {OverlayControl} from '../overlay/overlay.component';
import {NotificationComponent} from "./notification/notification.component";
import {Notification} from "./utils/notification";
import {NotificationDimensionDirective} from './utils/notification-dimension.directive';

export type NotificationDimensionChangeEvent = {
  index: number, newHeight: number
}

export type NotificationPlace = {
  height: number;
  top: number;
  notification: Notification
}

class NotificationHeightConverter {
  private notificationPosition: WritableSignal<NotificationPlace[]> = signal<NotificationPlace[]>([]);

  public getNotifications(): Signal<NotificationPlace[]> {
    return this.notificationPosition;
  }

  public addNewNotification(record: Omit<NotificationPlace, 'top'>): void {
    const length = this.notificationPosition().length;
    this.notificationPosition.update(notifications => [...notifications,
      {...record, top: this.calculatePosition(length)}]);
  }

  public getByIndex(index: number): NotificationPlace | null {
    return this.notificationPosition()[index] || null;
  }

  public deleteByIndex(index: number): void {
    this.notificationPosition.update(notifications =>
      notifications.filter((_, i) => i !== index));
    this.updateManyPositions(index);
  }

  public updateNotificationHeight(index: number, newHeight: number): void {
    this.notificationPosition.update((notifications: NotificationPlace[]) => {
      notifications[index].height = newHeight;
      return notifications;
    })

    this.updateManyPositions(index);
  }

  private updateManyPositions(fromIndex: number): void {
    this.notificationPosition.update(notifications => {

      for (let i = fromIndex; i < this.notificationPosition().length; i++) {
        this.notificationPosition()[i].top = this.calculatePosition(i);
      }

      return notifications;
    })
  }

  private calculatePosition(index: number): number {
    if(index === 0) {
      return 0;
    }


    const {top, height} = this.getByIndex(index - 1)!;


    return top + height + 20;
  }
}

@Component({
  selector: 'app-notification-wrapper',
  standalone: true,
  imports: [CommonModule, NotificationComponent, NotificationDimensionDirective],
  templateUrl: './notification-wrapper.component.html',
  styleUrl: './notification-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NotificationHeightConverter,
    }
  ]
})
export class NotificationWrapperComponent extends OverlayControl {

  @ViewChildren(NotificationDimensionDirective)
  public notificationsComponents: QueryList<NotificationDimensionDirective> | null = null;

  public notificationHeightConverter: NotificationHeightConverter = inject(NotificationHeightConverter);
  public notifications: Signal<NotificationPlace[]> = this.notificationHeightConverter.getNotifications()

  public onClose(index: number): void {
    this.notificationHeightConverter.deleteByIndex(index);
  }

  public attachNew(notification: Notification): void {
    this.notificationHeightConverter.addNewNotification({height: 60, notification})
  }

  public notificationHeightChanged($event: NotificationDimensionChangeEvent) {
    this.notificationHeightConverter.updateNotificationHeight($event.index, $event.newHeight);
  }

}

