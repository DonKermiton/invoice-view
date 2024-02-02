import { DestroyRef, inject, Injectable, Signal } from '@angular/core';
import {
  ANotificationHeightConverter,
  CurrentNotifications,
  NotificationPlace,
} from './notification-strategy/notification-template';
import { WindowResizerService } from '../../../../services/Window-resizer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

class MobileNotification extends ANotificationHeightConverter {
  public updateManyPositions(_: number): void {
    this.currentNotifications.notificationPosition.update((notifications) => {
      for (let i = 0; i < notifications.length; i++) {
        this.currentNotifications.notificationPosition()[i].top =
          this.calculatePosition(i);
      }

      return notifications;
    });
  }

  public calculatePosition(index: number): number {
    if (index === 0) {
      return 0;
    }

    const { top, height } = this.currentNotifications.getByIndex(index - 1)!;

    return top - height - 20;
  }

  public addNewNotification(record: Omit<NotificationPlace, 'top'>): void {
    const length = this.currentNotifications.getByIndex(0)?.top || 0;
    this.currentNotifications.notificationPosition.update((notifications) => [
      ...notifications,
      { ...record, top: this.calculatePosition(length) },
    ]);
  }
}

class DesktopNotification extends ANotificationHeightConverter {
  public updateManyPositions(fromIndex: number): void {
    this.currentNotifications.notificationPosition.update((notifications) => {
      for (
        let i = fromIndex;
        i < this.currentNotifications.notificationPosition().length;
        i++
      ) {
        this.currentNotifications.notificationPosition()[i].top =
          this.calculatePosition(i);
      }

      return notifications;
    });
  }

  public calculatePosition(index: number): number {
    if (index === 0) {
      return 0;
    }

    const { top, height } = this.currentNotifications.getByIndex(index - 1)!;

    return top + height + 20;
  }

  public addNewNotification(record: Omit<NotificationPlace, 'top'>): void {
    const length = this.currentNotifications.getLength();
    this.currentNotifications.notificationPosition.update((notifications) => [
      ...notifications,
      { ...record, top: this.calculatePosition(length) },
    ]);
  }
}

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
