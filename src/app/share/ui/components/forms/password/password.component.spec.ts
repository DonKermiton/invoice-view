import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { TestHelpers } from '@/testing';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordComponent } from '@/share/forms/password/password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let el: DebugElement;
  let formControl: FormControl<string | null>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PasswordComponent, ReactiveFormsModule],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: { control: new FormControl() },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PasswordComponent);
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

    const label = TestHelpers.findEl(fixture, 'password-label');
    expect(label.nativeElement.textContent.trim()).toBe('Test label');
  });

  it('should display label with required asterisk', () => {
    component.formControl?.addValidators(Validators.required);
    formControl.updateValueAndValidity();
    component.label = 'Test label';
    fixture.detectChanges();
    const label = TestHelpers.findEl(fixture, 'password-label');
    expect(label.nativeElement.textContent).toBe('Test label *');
  });

  it('should password be hidden', () => {
    fixture.detectChanges();
    const icon: string = TestHelpers.findEl(fixture, 'input-type-icon')
      .nativeElement.textContent;
    expect(icon.trim()).toBe('visibility');
  });

  it('should password visibility change', waitForAsync(async () => {
    TestHelpers.click(fixture, 'show-password-btn');
    fixture.detectChanges();
    const icon: string = TestHelpers.findEl(fixture, 'input-type-icon')
      .nativeElement.textContent;
    expect(icon.trim()).toBe('visibility_off');
  }));
});
