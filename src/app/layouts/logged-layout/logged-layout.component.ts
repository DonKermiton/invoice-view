import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutLoggedTopMenuComponent } from './mobile/layout-logged-top-menu/layout-logged-top-menu.component';
import { DesktopLoggedSideMenuComponent } from './desktop/desktop-logged-side-menu/desktop-logged-side-menu.component';

@Component({
  selector: 'app-logged-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutLoggedTopMenuComponent,
    DesktopLoggedSideMenuComponent,
  ],
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss'],
})
export class LoggedLayoutComponent {}
