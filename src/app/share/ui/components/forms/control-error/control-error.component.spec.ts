import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlErrorComponent } from '@/share/forms/control-error/control-error.component';
import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TestHelpers } from '@/testing';

describe('ControlErrorComponent', () => {
  let component: ControlErrorComponent;
  let fixture: ComponentFixture<ControlErrorComponent>;
  let el: DebugElement;
  let formControl: FormControl<string | null>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ControlErrorComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ControlErrorComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        formControl = new FormControl<string | null>('New value');
        component.control = formControl;
      })
      .catch(console.error);
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display error', waitForAsync(async () => {
    component.control?.setValidators(Validators.required);
    const change: SimpleChanges = {
      control: <SimpleChange>{
        previousValue: formControl,
        currentValue: formControl,
        firstChange: true,
      },
    };
    fixture.detectChanges();
    component.ngOnChanges(change);
    component.control?.patchValue('');
    expect(component.control?.getError('required')).toBeTrue();
    fixture.detectChanges();
    TestHelpers.expectText(fixture, 'error-text', 'Control is invalid');
  }));

  it('should display custom error', waitForAsync(async () => {
    component.control?.setValidators(Validators.minLength(10));
    component.control?.patchValue('');
    component.customErrorFields = {
      minlength: '{formControlName} Expected length 10',
    };
    component.controlName = 'someControlName';
    const change: SimpleChanges = {
      control: <SimpleChange>{
        previousValue: null,
        currentValue: formControl,
        firstChange: true,
      },
      customErrorFields: <SimpleChange>{
        previousValue: {},
        currentValue: component.customErrorFields,
        firstChange: true,
      },
    };
    fixture.detectChanges();
    component.ngOnChanges(change);
    component.control?.patchValue('new');
    fixture.detectChanges();
    expect(component.control?.getError('minlength')).toBeTruthy();
    TestHelpers.expectText(
      fixture,
      'error-text',
      'SOMECONTROLNAME Expected length 10',
    );
  }));
});
