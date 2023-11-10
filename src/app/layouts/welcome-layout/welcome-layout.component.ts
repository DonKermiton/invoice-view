import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterOutlet,
} from '@angular/router';
import { GuestFooterComponent } from './components/guest-footer/guest-footer.component';
import { GuestNavComponent } from './components/guest-nav/guest-nav.component';

@Component({
  selector: 'app-welcome-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    GuestNavComponent,
    GuestFooterComponent,
  ],
  templateUrl: './welcome-layout.component.html',
  styleUrls: ['./welcome-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeLayoutComponent implements OnInit {
  public showFooter = true;

  private route: ActivatedRoute;

  constructor() {
    this.route = inject(ActivatedRoute);
  }

  public ngOnInit(): void {
    this.displayFooter();
  }

  private displayFooter(): void {
    this.checkHasHideFooterOrGoDeeper(this.route.snapshot);
  }

  private checkHasHideFooterOrGoDeeper(
    activatedSnapshot: ActivatedRouteSnapshot,
  ): void {
    if (activatedSnapshot.data['hideFooter']) {
      this.showFooter = !activatedSnapshot.data['hideFooter'];
    } else if (activatedSnapshot.firstChild) {
      this.checkHasHideFooterOrGoDeeper(activatedSnapshot.firstChild);
    }
  }
}
