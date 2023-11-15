import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { TestHelpers } from '@/testing';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '@/share/forms/input/input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let el: DebugElement;
  let formControl: FormControl<string | null>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: { control: new FormControl() },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(InputComponent);
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

    const label = TestHelpers.findEl(fixture, 'input-label');
    expect(label.nativeElement.textContent.trim()).toBe('Test label');
  });

  it('should display label with required asterisk', () => {
    formControl.addValidators(Validators.required);
    component.label = 'Test label';
    fixture.detectChanges();
    const label = TestHelpers.findEl(fixture, 'input-label');
    expect(label.nativeElement.textContent).toBe('Test label *');
  });
});
