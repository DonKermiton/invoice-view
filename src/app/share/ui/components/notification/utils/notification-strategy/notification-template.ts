import { Notification } from '../notification';
import { signal, WritableSignal } from '@angular/core';

export type NotificationDimensionChangeEvent = {
  index: number;
  newHeight: number;
};

export type NotificationPlace = {
  height: number;
  top: number;
  notification: Notification;
};

export class CurrentNotifications {
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

export abstract class ANotificationHeightConverter {
  constructor(protected currentNotifications: CurrentNotifications) {}

  abstract calculatePosition(index: number): number;
  abstract updateManyPositions(fromIndex: number): void;
  abstract addNewNotification(record: Omit<NotificationPlace, 'top'>): void;
}
