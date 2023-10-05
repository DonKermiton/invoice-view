import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayAttachDirective } from './overlay-attach.directive';
import { PortalService } from '../../services/portal/portal.service';
import { OverlayService } from './overlay.service';
import { OverlayTypes } from './index';
import { Animations } from '@/share/animations/index';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements OnInit {
  @HostBinding('@fadeOnEnter')
  public animateOnEnter = null;

  @HostBinding('@fadeOnLeave')
  public animateOnLeave = null;

  @HostBinding('style.width')
  public width = '100%';

  public config: OverlayTypes.Component | OverlayTypes.Template | null = null;
  @ViewChild(OverlayAttachDirective, { static: true, read: ViewContainerRef })
  viewHost!: ViewContainerRef;
  private portalService: PortalService;

  constructor(private overlayService: OverlayService, private cdRef: ChangeDetectorRef) {
    this.portalService = inject(PortalService);
  }

  public ngOnInit(): void {
    this.createOverlay();
  }

  public closeOverlay() {
    this.viewHost.clear();
    this.overlayService.closeOverlay();
  }

  private createOverlay(): void {
    if (!this.viewHost && !this.config) {
      return;
    }

    if (OverlayTypes.isComponent(this.config as OverlayTypes.Component)) {
      this.createComponent();
    } else if (OverlayTypes.isTemplate(this.config as OverlayTypes.Template)) {
      this.createTemplate();
    }
    this.cdRef.detectChanges()
  }

  private createComponent(): void {
    this.viewHost.createComponent<any>(
      (this.config as OverlayTypes.Component).component,
    );
  }

  private createTemplate(): void {
    this.viewHost.createEmbeddedView(
      (this.config as OverlayTypes.Template).template,
    );
  }
}
