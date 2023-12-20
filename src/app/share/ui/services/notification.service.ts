import { ComponentRef, Injectable } from '@angular/core';
import { OverlayService } from '../components/overlay/overlay.service';
import { NotificationWrapperComponent } from '../components/notification/notification-wrapper.component';
import { Notification } from '../components/notification/utils/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private overlayInstance:
    | ComponentRef<NotificationWrapperComponent>
    | undefined = undefined;
  private notificationWrapperComponent:
    | NotificationWrapperComponent
    | undefined;

  constructor(private overlayService: OverlayService) {}

  public create(): void {
    if (!this.overlayInstance) {
      this.overlayInstance = this.createOverlay();
      this.notificationWrapperComponent = this.overlayInstance?.instance;
    }

    this.addNewNotification();
  }

  private addNewNotification(): void {
    if (this.notificationWrapperComponent) {
      this.notificationWrapperComponent.attachNew(
        new Notification({
          title: 'logged',
          variant: 'message',
          text: '<div>some text</div>',
        }),
      );
    }
  }

  private createOverlay():
    | ComponentRef<NotificationWrapperComponent>
    | undefined {
    return this.overlayService.openOverlay<NotificationWrapperComponent>({
      component: NotificationWrapperComponent,
      closeOnBackdropClick: false,
      showBackdrop: false,
    });
  }
}
