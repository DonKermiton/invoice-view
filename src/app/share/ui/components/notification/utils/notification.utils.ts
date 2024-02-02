import { Notification } from './notification';
import { Signal, signal, WritableSignal } from '@angular/core';

export type NotificationDimensionChangeEvent = {
  index: number;
  newHeight: number;
};

export type NotificationPlace = {
  height: number;
  top: number;
  notification: Notification;
};

abstract class ANotificationHeightConverter {
  constructor(protected currentNotifications: CurrentNotifications) {}

  abstract calculatePosition(index: number): number;
  abstract updateManyPositions(fromIndex: number): void;
  abstract addNewNotification(record: Omit<NotificationPlace, 'top'>): void;
}

class MobileNotification extends ANotificationHeightConverter {
  public updateManyPositions(fromIndex: number): void {
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

class CurrentNotifications {
  public notificationPosition: WritableSignal<NotificationPlace[]> = signal<
    NotificationPlace[]
  >([]);

  public getLength(): number {
    return this.notificationPosition().length;
  }

  public getByIndex(index: number): NotificationPlace | null {
    return this.notificationPosition()[index] || null;
  }
}

export class NotificationHeightConverter {
  private currentNotifications: CurrentNotifications =
    new CurrentNotifications();

  private currentStrategy: ANotificationHeightConverter =
    new MobileNotification(this.currentNotifications);

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
