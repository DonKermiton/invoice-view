import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ResolveForm } from '@/share-forms/_generics/resolve-form';
import { EmailComponent } from '@/share/forms/email/email.component';
import { PasswordComponent } from '@/share/forms/password/password.component';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmailComponent,
    PasswordComponent
],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterUserComponent
  extends ResolveForm
  implements AfterViewInit
{
  constructor() {
    super();
  }

  public afterViewWasInit(): void {}

  private areEmailsTheSame(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      console.log(form);
      const email = form.get('email')?.value;
      const confEmail = form.get('confirmEmail')?.value;

      return email === confEmail ? {} : { emailsInvalid: true };
    };
  }
}
