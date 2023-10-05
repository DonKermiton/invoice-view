import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericControlValueAcc } from '@/share/forms/_generics/genericControlValueAcc';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends GenericControlValueAcc {
  @Input()
  public autocomplete: string = 'off';

  @Input()
  public type = 'text';

  @Input()
  public inputStyles: Record<string, string> = {};

  constructor() {
    super();

    this.control.statusChanges?.subscribe(() => {
      console.log(this.control);
    });
  }
}
