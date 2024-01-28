import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Animations } from '@/share/animations/index';

import { OverlayControl } from '../../../../share/ui/components/overlay/overlayControl';
import { Router } from '@angular/router';

export interface MobileSideMenuComponentData {
  key: string;
  routerLink: string;
}

export type MobileSideMenuData = {
  links: MobileSideMenuComponentData[];
};

@Component({
  selector: 'app-mobile-side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-side-menu.component.html',
  styleUrls: ['./mobile-side-menu.component.scss'],
  animations: [Animations.fromRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSideMenuComponent
  extends OverlayControl<MobileSideMenuData>
  implements OnInit, OnDestroy
{
  public links: MobileSideMenuComponentData[] = [];

  @HostBinding('@fromRight')
  public animateOnEnter = null;

  private router: Router = inject(Router);

  public ngOnInit() {
    if (this.data) {
      this.links = this.data.links;
    }
  }

  public ngOnDestroy(): void {
    console.log('from ngOnDestroy');
  }

  public route(link: MobileSideMenuComponentData): void {
    this.router.navigate([link.routerLink]).then(() => super.close());
  }
}
