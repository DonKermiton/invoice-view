import {
  ANotificationHeightConverter,
  NotificationPlace,
} from './notification-template';

export class DesktopNotification extends ANotificationHeightConverter {
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
