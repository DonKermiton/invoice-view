import { Directive, HostBinding, HostListener } from '@angular/core';
import { StepperComponent } from '../stepper.component';

@Directive({
  selector: '[appStepperNextPage]',
  standalone: true,
})
export class StepperNextPageDirective {
  @HostListener('click')
  public onClick(): void {
    this.stepper.next();
  }
  constructor(private stepper: StepperComponent) {}
}
