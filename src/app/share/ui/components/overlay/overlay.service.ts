import { ComponentRef, inject, Injectable } from '@angular/core';
import {
  PortalInstance,
  PortalService,
} from '../../services/portal/portal.service';
import { OverlayComponent } from './overlay.component';
import { OverlayTypes } from './index';

export type PortalKind = OverlayTypes.Component | OverlayTypes.Template;

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  public portalReference: PortalInstance | null = null;
  private portalService: PortalService;
  private overlayComponent: OverlayComponent | null = null;

  constructor() {
    this.portalService = inject(PortalService);
  }

  public openOverlay<T = any>(config: PortalKind): ComponentRef<T> | undefined {
    this.checkAndCreateOverlay();
    const component = this.attachNewViewToOverlay<T>(config);

    this.passConfigToInstance(config);
    return component;
  }

  private checkAndCreateOverlay(): void {
    if (!this.portalReference) {
      this.portalReference = this.portalService.open({
        component: OverlayComponent,
      });
      this.overlayComponent = <OverlayComponent>(
        this.portalReference.component.instance
      );
    }
  }

  private attachNewViewToOverlay<T>(
    config: PortalKind,
  ): ComponentRef<T> | undefined {
    if (!this.overlayComponent) {
      throw new Error(
        '[attachNewViewToOverlay] ERROR = overlayComponent is null',
      );
    }
    return this.overlayComponent.attach<T>(config);
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
