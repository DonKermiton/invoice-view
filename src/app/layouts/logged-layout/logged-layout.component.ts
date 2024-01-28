import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutLoggedTopMenuComponent } from './layout-logged-top-menu/layout-logged-top-menu.component';

@Component({
  selector: 'app-logged-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutLoggedTopMenuComponent],
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss'],
})
export class LoggedLayoutComponent {}
