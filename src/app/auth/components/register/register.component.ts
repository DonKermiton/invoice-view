import { Component } from '@angular/core';
import { StepperComponent } from 'src/app/share/ui/components/stepper/stepper.component';
import { StepComponent } from 'src/app/share/ui/components/stepper/step/step.component';
import { StepperNextPageDirective } from '../../../share/ui/components/stepper/directives/stepper-next-page.directive';
import { ButtonComponent } from '../../../share/ui/components/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    StepperComponent,
    StepComponent,
    StepperNextPageDirective,
    ButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {}
