import {
  Component,
  ElementRef,
  inject,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { asyncScheduler } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  animations: [],
})
export class ButtonComponent {
  @Input() public text!: string;

  @Input()
  public disabled = false;

  @Input() public type: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  public loading = false;

  @ViewChild('button', {
    static: false,
    read: ElementRef<HTMLButtonElement>,
  })
  private button!: ElementRef<HTMLButtonElement>;

  private renderer: Renderer2;

  constructor() {
    this.renderer = inject(Renderer2);
  }

  public createRipple($event: MouseEvent): void {
    const button: any = $event.currentTarget;

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const circle = this.renderer.createElement('span');

    this.renderer.setStyle(circle, 'width', `${diameter}px`);
    this.renderer.setStyle(circle, 'height', `${diameter}px`);
    this.renderer.setStyle(
      circle,
      'left',
      `${$event.clientX - (button.offsetLeft + radius)}px`,
    );
    this.renderer.setStyle(
      circle,
      'top',
      `${$event.clientY - (button.offsetTop + radius)}px`,
    );

    this.renderer.addClass(circle, 'ripple');
    this.button.nativeElement.appendChild(circle);

    asyncScheduler.schedule(() => {
      this.button.nativeElement.removeChild(circle);
    }, 600);
  }
}
