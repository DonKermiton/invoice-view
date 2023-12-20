import {
  Component,
  DestroyRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification, NotificationConfig } from '../utils/notification';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  BehaviorSubject,
  filter,
  interval,
  map,
  Observable,
  of,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const px = 'px';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [
    trigger('notification', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
        animate(
          '.3s ease-out',
          style({
            transform: 'translateX(0%)',
            opacity: 1,
          }),
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0%)',
        }),
        animate(
          '.3s ease-out',
          style({
            transform: 'translateX(100%)',
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  @HostBinding('@notification')
  public fromRightOnEnter = true;

  @HostBinding('class')
  public variant = 'message';

  @HostBinding('style.top')
  @Input({ transform: (value: number) => value + px })
  public positionTop = '0px';

  @Input({ required: true })
  public index!: number;

  @Input({ required: true })
  public notification!: Notification;

  @Output()
  public close$: EventEmitter<void> = new EventEmitter<void>();

  public config!: NotificationConfig;
  public notificationTimer: NotificationTimer | null = null;
  public progressBar: WritableSignal<string> = signal('100%');
  private readonly HEIGHT: number = 70;
  private readonly MARGIN: number = 20;
  private destroyRef: DestroyRef = inject(DestroyRef);

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.notificationTimer?.pause();
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.notificationTimer?.resume();
  }

  public ngOnInit(): void {
    this.config = this.notification.getConfig();
    this.variant = this.config.variant;
    this.countTime();
  }

  // public ngOnChanges(changes: SimpleChanges): void {
  // }

  public close(): void {
    this.close$.next();
  }

  private countTime(): void {
    if (!this.config.timeout) {
      return;
    }

    this.notificationTimer = new NotificationTimer(this.config.timeout);

    this.notificationTimer.timer$
      .pipe(
        tap(([time]) => {
          this.progressBar.set(`${(time * 100) / this.config.timeout!}%`);
        }),
        filter(([_, completed]) => completed),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.close());
  }

  test() {
    this.config.text =
      'dsafdsfasdfsdafsadf sdafasdf asdf asjdfjas dfasdjfjasdk fjklasjdfkajsldkfjklas;dj;faljdsfklaskjdlfja;lsdjfa sdaklf kaljsdfklsjdkfljaksl fjka skjfl askldfkalsd fklasjdklaklsdj kalsdj kldjsaf klasdjfkladjsfkla sdkf klsda fklajs dfkj asdklj ';
  }
}

class NotificationTimer {
  public timer$: Observable<[number, boolean]> = of([0, false]);
  private pause$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  private timeLeft = this.seconds;

  constructor(private seconds: number) {
    this.timer$ = interval(1000).pipe(
      withLatestFrom(this.pause$),
      filter(([_, paused]) => !paused),
      tap(() => this.timeLeft--),
      takeWhile(() => this.timeLeft >= 0),
      map(() => [this.timeLeft, this.timeLeft == 0]),
    );
  }

  public pause(): void {
    this.pause$.next(true);
  }

  public resume(): void {
    this.pause$.next(false);
  }
}
