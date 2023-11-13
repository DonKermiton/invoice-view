import { Directive, HostBinding, HostListener, inject } from '@angular/core';
import { StepperComponent } from '../stepper.component';

@Directive({
  selector: '[appStepperNextPage]',
  standalone: true,
})
export class StepperNextPageDirective {
  private stepper: StepperComponent;

  @HostListener('click')
  public onClick(): void {
    this.stepper.next();
  }
  constructor() {
    this.stepper = inject(StepperComponent);
  }
}
