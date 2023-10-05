import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@/share/forms/input/input.component';
import { FormsModule, Validators } from '@angular/forms';
import { GenericControlValueAcc } from '@/share/forms/_generics/genericControlValueAcc';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule, InputComponent, FormsModule],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent extends GenericControlValueAcc implements OnInit {
  constructor() {
    super();
  }

  public ngOnInit() {
    this.addValidators(Validators.email);
  }
}
