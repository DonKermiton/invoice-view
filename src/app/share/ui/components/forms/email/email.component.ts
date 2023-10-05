import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@/share/forms/input/input.component';
import { Validators } from '@angular/forms';
import { InputValidation } from '@/share/forms/_generics/input-validation.utils';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent {
  public validation: InputValidation = new InputValidation().add([
    Validators.required,
    Validators.email,
  ]);
}
