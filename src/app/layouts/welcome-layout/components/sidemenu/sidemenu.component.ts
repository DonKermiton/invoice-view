import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Animations } from '@/share/animations/index';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  animations: [Animations.fromRight],
})
export class SidemenuComponent implements OnInit {
  @HostBinding('@fromRight')
  public animateOnEnter = null;

  public ngOnInit() {
    return void 0;
  }
}
