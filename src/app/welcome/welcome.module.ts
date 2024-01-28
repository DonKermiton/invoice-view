import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { MobileSideMenuComponent } from '../layouts/welcome-layout/components/sidemenu/mobile-side-menu.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, WelcomeRoutingModule, MobileSideMenuComponent],
})
export class WelcomeModule {}
