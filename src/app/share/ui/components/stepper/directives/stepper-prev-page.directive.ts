import { Directive, HostListener, inject } from '@angular/core';
import { StepperComponent } from '../stepper.component';

@Directive({
  selector: '[appStepperPrevPage]',
  standalone: true,
})
export class StepperPrevPageDirective {
  private stepper: StepperComponent;

  constructor() {
    this.stepper = inject(StepperComponent);
  }

  @HostListener('click')
  public onClick(): void {
    this.stepper.prev();
  }
}
