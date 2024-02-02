import { DestroyRef, inject, Injectable, Signal } from '@angular/core';
import {
  ANotificationHeightConverter,
  CurrentNotifications,
  NotificationPlace,
} from './notification-strategy/notification-template';
import { WindowResizerService } from '../../../../services/Window-resizer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MobileNotification } from './notification-strategy/mobile-notification-strategy';
import { DesktopNotification } from './notification-strategy/desktop-notification-strategy';

@Injectable()
export class NotificationHeightConverter {
  private currentNotifications: CurrentNotifications =
    new CurrentNotifications();

  private currentStrategy: ANotificationHeightConverter =
    new MobileNotification(this.currentNotifications);

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private windowResizeService: WindowResizerService) {
    this.listenToResizeChange();
  }

  private listenToResizeChange(): void {
    this.windowResizeService
      .listenToResize()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (
          event > 1200 &&
          !(this.currentStrategy instanceof DesktopNotification)
        ) {
          this.currentStrategy = new DesktopNotification(
            this.currentNotifications,
          );
        } else if (!(this.currentStrategy instanceof MobileNotification)) {
          this.currentStrategy = new MobileNotification(
            this.currentNotifications,
          );
        }
      });
  }

  public getNotifications(): Signal<NotificationPlace[]> {
    return this.currentNotifications.notificationPosition;
  }

  public addNewNotification(record: Omit<NotificationPlace, 'top'>): void {
    this.currentStrategy.addNewNotification(record);
  }

  public deleteByIndex(index: number): void {
    this.currentNotifications.notificationPosition.update((notifications) =>
      notifications.filter((_, i) => i !== index),
    );
    this.currentStrategy.updateManyPositions(index);
  }

  public updateNotificationHeight(index: number, newHeight: number): void {
    this.currentNotifications.notificationPosition.update(
      (notifications: NotificationPlace[]) => {
        notifications[index].height = newHeight;
        return notifications;
      },
    );

    this.currentStrategy.updateManyPositions(index);
  }
}
