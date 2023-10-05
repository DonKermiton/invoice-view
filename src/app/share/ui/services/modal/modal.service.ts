import { inject, Injectable } from '@angular/core';
import { OverlayService } from '../../components/overlay/overlay.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayService: OverlayService;

  constructor() {
    this.overlayService = inject(OverlayService);
  }

  public openModalService(): void {
    // this.overlayService.openOverlay({});
  }
}
