import { ComponentRef } from '@angular/core';

export class OverlayControl<TData = any> {
  // todo:: add template
  /*
    data passed to component
   */
  data: TData | null = null;

  public closeOnBackdropClick = false;
  /*
    reference to view in overlay component
  */
  public viewInstance!: ComponentRef<any>;

  /*
    set view instance to control
   */
  public setViewInstance(viewInstance: ComponentRef<any>): void {
    this.viewInstance = viewInstance;

    this.viewInstance.onDestroy(() => ({}));
  }

  /*
    destroy view instance
   */
  public close(): void {
    this.viewInstance.destroy();
  }
}
