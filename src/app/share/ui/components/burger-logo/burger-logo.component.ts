import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
export class BurgerLogoComponent implements OnChanges {
  active = false;

  @Output()
  buttonClickEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() portalRef!: ComponentRef<any> | undefined;

  constructor(private cdRef: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ('portalRef' in changes) {
      this.listenToPortalDestroy();
    }
  }

  public onBurgerClick(): void {
    this.active = !this.active;
    this.buttonClickEvent.emit();
    this.cdRef.detectChanges();
  }

  private listenToPortalDestroy(): void {
    if (this.portalRef) {
      this.portalRef.onDestroy(() => {
        this.active = false;
        this.cdRef.detectChanges();
      });
    }
  }
}
