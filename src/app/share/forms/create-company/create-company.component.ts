import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveForm } from '../_generics/resolve-form';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@/share/forms/input/input.component';
import { EmailComponent } from '@/share/forms/email/email.component';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, EmailComponent],
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss'],
})
export class CreateCompanyComponent extends ResolveForm {
  public override afterViewWasInit(): void {
    this.formGroup?.addControl(
      'companyName',
      new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    );
  }
}
