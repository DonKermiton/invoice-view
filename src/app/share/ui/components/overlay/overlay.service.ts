import { inject, Injectable } from '@angular/core';
import {
  PortalInstance,
  PortalService,
} from '../../services/portal/portal.service';
import { OverlayComponent } from './overlay.component';
import { OverlayTypes } from './index';

type PortalKind = OverlayTypes.Component | OverlayTypes.Template;

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  public portalReference: PortalInstance | null = null;
  private portalService: PortalService;

  constructor() {
    this.portalService = inject(PortalService);
  }

  public openOverlay<TDataStream = any>(
    config: PortalKind,
  ): PortalInstance<TDataStream> {
    this.portalReference = this.portalService.open({
      component: OverlayComponent,
    });

    this.passConfigToInstance(config);
    return this.portalReference;
  }

  public closeOverlay(): void {
    // todo::
    this.portalReference?.destroy({});
  }

  public onClose() {
    // todo::
  }

  private passConfigToInstance(config: PortalKind): void {
    if (this.portalReference instanceof PortalInstance) {
      this.portalReference.component.instance.config = config;
    } else {
      throw new Error(
        '[OverlayService-passConfigToInstance] portalReference is not PortalInstance',
      );
    }
  }
}
