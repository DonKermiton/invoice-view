import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-burger-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burger-logo.component.html',
  styleUrls: ['./burger-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerLogoComponent {
  active = false;

  @Output()
  buttonClickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private cdRef: ChangeDetectorRef) {}

  public onBurgerClick(): void {
    this.active = !this.active;
    this.buttonClickEvent.emit();
    this.cdRef.detectChanges();
  }
}
