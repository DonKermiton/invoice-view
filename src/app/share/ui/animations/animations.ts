import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeOnEnter = trigger('fadeOnEnter', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '.3s',
      style({
        opacity: 1,
      }),
    ),
    query('@*', animateChild(), { optional: true }),
  ]),
]);

export const fadeOnLeave = trigger('fadeOnLeave', [
  transition(':leave', [
    query('@*', animateChild(), { optional: true }),
    animate(
      '.3s',
      style({
        opacity: 0,
      }),
    ),
  ]),
]);

export const fromRight = trigger('fromRight', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
    }),
    animate(
      '.5s 300ms ease-out',
      style({
        transform: 'translateX(0%)',
      }),
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0%)',
    }),
    animate(
      '.5s ease-out',
      style({
        transform: 'translateX(-100%)',
      }),
    ),
  ]),
]);

export const carousel = trigger('carousel', [
  transition('out <=> toRight', [
    style({
      transform: 'translateX(-100%)',
    }),
    animate(
      '.5s 300ms ease-out',
      style({
        transform: 'translateX(0%)',
      }),
    ),
  ]),
  transition('out <=> toLeft', [
    style({
      transform: 'translateX(100%)',
    }),
    animate(
      '.5s 300ms ease-out',
      style({
        transform: 'translateX(0%)',
      }),
    ),
  ]),
]);
