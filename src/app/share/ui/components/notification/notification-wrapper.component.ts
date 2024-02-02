import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  QueryList,
  Signal,
  ViewChildren,
} from '@angular/core';
import { NotificationComponent } from './notification/notification.component';
import { Notification } from './utils/notification';
import { NotificationDimensionDirective } from './utils/notification-dimension.directive';
import { OverlayControl } from '../overlay/overlayControl';
import { NotificationHeightConverter } from './utils/notification.utils';
import {
  NotificationDimensionChangeEvent,
  NotificationPlace,
} from './utils/notification-strategy/notification-template';

@Component({
  selector: 'app-notification-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    NotificationComponent,
    NotificationDimensionDirective,
  ],
  templateUrl: './notification-wrapper.component.html',
  styleUrl: './notification-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NotificationHeightConverter,
    },
  ],
})
export class NotificationWrapperComponent extends OverlayControl {
  @ViewChildren(NotificationDimensionDirective)
  public notificationsComponents: QueryList<NotificationDimensionDirective> | null =
    null;

  public notificationHeightConverter: NotificationHeightConverter = inject(
    NotificationHeightConverter,
  );
  public notifications: Signal<NotificationPlace[]> =
    this.notificationHeightConverter.getNotifications();

  public onClose(index: number): void {
    this.notificationHeightConverter.deleteByIndex(index);
  }

  public attachNew(notification: Notification): void {
    this.notificationHeightConverter.addNewNotification({
      height: 60,
      notification,
    });
  }

  public notificationHeightChanged($event: NotificationDimensionChangeEvent) {
    this.notificationHeightConverter.updateNotificationHeight(
      $event.index,
      $event.newHeight,
    );
  }
}
