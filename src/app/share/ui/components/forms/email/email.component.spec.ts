import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmailComponent } from '@/share/forms/email/email.component';
import { DebugElement } from '@angular/core';
import { TestHelpers } from '@/testing';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
describe('EmailInputComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let el: DebugElement;
  let formControl: FormControl<string | null>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EmailComponent, ReactiveFormsModule],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: { control: new FormControl() },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EmailComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        formControl = new FormControl<string>('Value');
        component.formControl = formControl;
      });
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    component.label = 'Test label';
    fixture.detectChanges();

    const label = TestHelpers.findEl(fixture, 'email-label');
    expect(label.nativeElement.textContent.trim()).toBe('Test label');
  });

  it('should display label with required asterisk', () => {
    formControl.addValidators(Validators.required);
    component.label = 'Test label';
    fixture.detectChanges();
    const label = TestHelpers.findEl(fixture, 'email-label');
    expect(label.nativeElement.textContent).toBe('Test label *');
  });
});
