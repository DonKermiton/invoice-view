import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../../../share/ui/components/logo/logo.component';
import { BurgerLogoComponent } from '../../../../share/ui/components/burger-logo/burger-logo.component';
import { OverlayService } from '../../../../share/ui/components/overlay/overlay.service';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';

@Component({
  selector: 'app-guest-nav',
  standalone: true,
  imports: [CommonModule, LogoComponent, BurgerLogoComponent],
  templateUrl: './guest-nav.component.html',
  styleUrls: ['./guest-nav.component.scss'],
})
export class GuestNavComponent {
  private overlayService: OverlayService;
  constructor() {
    this.overlayService = inject(OverlayService);
  }

  public openSidebar(): void {
    const portalRef = this.overlayService.openOverlay({
      component: SidemenuComponent,
      width: '80%',
    });
  }
}
