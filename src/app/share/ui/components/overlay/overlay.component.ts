import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  HostBinding,
  inject,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {OverlayAttachDirective} from './overlay-attach.directive';
import {PortalService} from '../../services/portal/portal.service';
import {PortalKind} from './overlay.service';
import {OverlayTypes} from './index';
import {Animations} from '@/share/animations/index';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule, OverlayAttachDirective],
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    Animations.fadeOnEnter,
    Animations.fadeOnLeave,
    Animations.fromRight,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent {
  @HostBinding('@fadeOnEnter')
  public animateOnEnter = null;

  @HostBinding('@fadeOnLeave')
  public animateOnLeave = null;

  @HostBinding('style.width')
  public width = '100%';

  public config: OverlayTypes.Component | OverlayTypes.Template | null = null;
  @ViewChild(OverlayAttachDirective, {static: true, read: ViewContainerRef})
  viewHost!: ViewContainerRef;
  protected showBackdropForEl: ComponentRef<any> | null = null;
  private portalService: PortalService;

  constructor(
    private cdRef: ChangeDetectorRef,
    private rv2: Renderer2,
  ) {
    this.portalService = inject(PortalService);
  }

  public closeOverlay() {
    this.showBackdropForEl?.destroy();

    this.showBackdropForEl = null;
  }

  public attach<T>(config: PortalKind): ComponentRef<T> | undefined {
    if (!this.viewHost) {
      return;
    }

    const component = this.createComponent<T>(config);

    this.cdRef.detectChanges();
    return component;
  }

  public onBackdropClick(): void {
    if (this.config?.closeOnBackdropClick) {
      this.closeOverlay();
    }
  }

  private createComponent<T>(config: PortalKind): ComponentRef<T> {
    const ref = this.viewHost.createComponent<any>((config as OverlayTypes.Component).component);

    if (config.showBackdrop) {
      this.showBackdropForEl = ref;
    }

    if (config.closeOnBackdropClick) {
      this.showBackdropForEl?.onDestroy(() => {
        this.showBackdropForEl = null;
      })
    }

    (ref.instance as OverlayControl).setViewInstance(ref);
    this.attachStylesToView(ref);
    return ref;
  }

  private attachStylesToView(ref: ComponentRef<any>): void {
    this.rv2.setStyle(ref.location.nativeElement, 'z-index', 1500);
    this.rv2.setStyle(ref.location.nativeElement, 'position', 'absolute');
    this.rv2.setStyle(ref.location.nativeElement, 'pointer-events', 'auto');
  }

  // private createTemplate(template: TemplateRef<any>): void {
  //   this.viewHost.createEmbeddedView(template);
  // }
}

export class OverlayControl {
  // todo:: add template

  public closeOnBackdropClick = false;
  /*
    reference to view in overlay component
  */
  private viewInstance!: ComponentRef<any>;

  public setViewInstance(viewInstance: ComponentRef<any>): void {
    this.viewInstance = viewInstance;

    this.viewInstance.onDestroy(() => {
      console.log('teraz')
    })
  }

  public destroy(): void {
    this.viewInstance.destroy();
  }
}

