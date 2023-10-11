import {
  AfterViewInit,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent {
  @Input({ required: true })
  public header = '';

  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<any>;
}
