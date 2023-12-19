import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Animations } from '@/share/animations/index';
import { OverlayControl } from 'src/app/share/ui/components/overlay/overlay.component';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  animations: [Animations.fromRight],
})
export class SidemenuComponent extends OverlayControl implements OnInit, OnDestroy {

  @HostBinding('@fromRight')
  public animateOnEnter = null;

  public ngOnInit() {
    return void 0;
  }

  public ngOnDestroy(): void {
    console.log('from ngOnDestroy')
  }
}
