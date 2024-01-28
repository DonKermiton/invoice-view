import { Component, OnInit } from '@angular/core';
import { fadeOnEnter } from './share/ui/animations/animations';
import { Store } from '@ngrx/store';
import { selectAuthState } from './auth/store/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeOnEnter],
})
export class AppComponent implements OnInit {
  title = 'invoice-view';

  constructor(private store: Store) {}

  public ngOnInit() {
    this.store.select(selectAuthState).subscribe((user) => console.log(user));
  }

}
