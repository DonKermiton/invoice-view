import {
  ANotificationHeightConverter,
  NotificationPlace,
} from './notification-template';

export class MobileNotification extends ANotificationHeightConverter {
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
