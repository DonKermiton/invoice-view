import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { SidemenuComponent } from '../layouts/welcome-layout/components/sidemenu/sidemenu.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, WelcomeRoutingModule, SidemenuComponent],
})
export class WelcomeModule {}
