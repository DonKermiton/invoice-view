import { Component, ComponentRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayService } from '../../../../share/ui/components/overlay/overlay.service';
import { MobileSideMenuComponent } from '../../../welcome-layout/components/sidemenu/mobile-side-menu.component';
import { BurgerLogoComponent } from '../../../../share/ui/components/burger-logo/burger-logo.component';

@Component({
  selector: 'app-layout-logged-top-menu',
  standalone: true,
  imports: [CommonModule, BurgerLogoComponent],
  templateUrl: './layout-logged-top-menu.component.html',
  styleUrl: './layout-logged-top-menu.component.scss',
})
export class LayoutLoggedTopMenuComponent {
  public portal: ComponentRef<any> | undefined;
  private overlayService: OverlayService = inject(OverlayService);

  public openSideMenu(): void {
    this.portal = this.overlayService.openOverlay({
      component: MobileSideMenuComponent,
      data: {
        links: [
          {
            key: 'dashboard',
            routerLink: '/dashboard',
          },
          {
            key: 'profile',
            routerLink: '/profile',
          },
          {
            key: 'logout',
            routerLink: '/logout',
          },
        ],
      },
      width: '80%',
      showBackdrop: true,
      closeOnBackdropClick: true,
    });
  }
}
