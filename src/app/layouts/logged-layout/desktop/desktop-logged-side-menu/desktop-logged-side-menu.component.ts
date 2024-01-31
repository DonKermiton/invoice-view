import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SideMenuElements {
  name: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-desktop-logged-side-menu',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './desktop-logged-side-menu.component.html',
  styleUrl: './desktop-logged-side-menu.component.scss',
})
export class DesktopLoggedSideMenuComponent {
  public sideMenuElements: SideMenuElements[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
    },
    {
      name: 'Profile',
      icon: 'person',
      path: '/profile',
    },
    {
      name: 'Settings',
      icon: 'settings',
      path: '/settings',
    },
    {
      name: 'Logout',
      icon: 'logout',
      path: '/logout',
    },
  ];
}
