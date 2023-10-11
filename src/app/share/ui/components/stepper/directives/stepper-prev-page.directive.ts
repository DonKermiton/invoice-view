import { Directive, HostListener } from '@angular/core';
import { StepperComponent } from '../stepper.component';

@Directive({
  selector: '[appStepperPrevPage]',
  standalone: true,
})
export class StepperPrevPageDirective {
  constructor(private stepper: StepperComponent) {}

  @HostListener('click')
  public onClick(): void {
    this.stepper.prev();
  }
}
