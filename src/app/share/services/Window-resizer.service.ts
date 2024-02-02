import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowResizerService {
  private readonly windowResize$: BehaviorSubject<number> =
    new BehaviorSubject<number>(window.document.documentElement.clientWidth);

  constructor() {
    this.listenToWindowResize();
  }

  public listenToResize(): Observable<number> {
    return this.windowResize$.pipe(debounceTime(150));
  }

  private listenToWindowResize(): void {
    const resize = new ResizeObserver((e) => {
      if (e && e[0]?.target?.clientHeight) {
        this.windowResize$.next(e[0].target.clientWidth);
      }
    });

    resize.observe(document.documentElement);
  }
}
