import { RegisterComponent } from './register.component';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { I18nService } from '@/core/i18n/i18n.service';
import { I18nServiceTest } from '@/core/i18n/i18n.service.test';
import { TestHelpers } from '@/testing';
import { SingleHttpStore } from '@/store/single-http';
import { RegisterActions } from '../../store/auth.actions';
import * as AuthTypes from '../../auth.types';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;

  let store: MockStore;
  const initialState = SingleHttpStore.CreateInitialState({});

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: I18nService,
          useClass: I18nServiceTest,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      })
      .catch(console.error);

    store = TestBed.inject<MockStore>(MockStore);
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should email be valid', () => {
    fixture.detectChanges();
    const el = TestHelpers.findEl(fixture, 'email-test-control');
    const inputEl = el.nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(inputEl, 'test2@test.pl');
    expect(component.userDataForm.get('email')?.valid).toBeTruthy();
  });

  it('should confirm email be valid', () => {
    fixture.detectChanges();
    const el = TestHelpers.findEl(fixture, 'email-confirm-test-control');
    const inputEl = el.nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(inputEl, 'test2@test.pl');
    expect(component.userDataForm.get('confirmEmail')?.valid).toBeTruthy();
  });

  it('should emails match', () => {
    fixture.detectChanges();

    const email = TestHelpers.findEl(fixture, 'email-test-control')
      .nativeElement.childNodes[0].childNodes[0];
    const confirmEmail = TestHelpers.findEl(
      fixture,
      'email-confirm-test-control',
    ).nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(email, 'test@test.pl');
    TestHelpers.setFieldElementValue(confirmEmail, 'test@test.pl');

    expect(component.userDataForm.hasError('different-emails')).toBeFalse();
  });

  it('should emails be invalid', () => {
    fixture.detectChanges();

    const email = TestHelpers.findEl(fixture, 'email-test-control')
      .nativeElement.childNodes[0].childNodes[0];
    const confirmEmail = TestHelpers.findEl(
      fixture,
      'email-confirm-test-control',
    ).nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(email, 'test@test.pl');
    TestHelpers.setFieldElementValue(confirmEmail, 'xyz@test.pl');

    expect(component.userDataForm.hasError('different-emails')).toBeTrue();
  });

  it('should password be valid', async () => {
    fixture.detectChanges();
    const el = TestHelpers.findEl(fixture, 'password-test-control');
    const inputEl = el.nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(inputEl, 'Warszawa#1');

    expect(component.userDataForm.get('password')?.valid).toBeTruthy();
  });

  it('should password be invalid', () => {
    fixture.detectChanges();
    const el = TestHelpers.findEl(fixture, 'password-test-control');
    const inputEl = el.nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(inputEl, 'test');

    expect(component.userDataForm.get('password')?.valid).toBeFalse();
  });

  it('should passwords match', () => {
    fixture.detectChanges();

    const passwordEl = TestHelpers.findEl(fixture, 'password-test-control')
      ?.nativeElement.childNodes[0].childNodes[0];

    const confirmPasswordEl = TestHelpers.findEl(
      fixture,
      'confirm-password-test-control',
    )?.nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(passwordEl, 'TestTest#1');
    TestHelpers.setFieldElementValue(confirmPasswordEl, 'TestTest#1');

    expect(component.userDataForm.valid).toBeTrue();
  });

  it('should passwords be different', () => {
    fixture.detectChanges();

    const passwordEl = TestHelpers.findEl(fixture, 'password-test-control')
      ?.nativeElement.childNodes[0].childNodes[0];

    const confirmPasswordEl = TestHelpers.findEl(
      fixture,
      'confirm-password-test-control',
    )?.nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(passwordEl, 'TestTest#1');
    TestHelpers.setFieldElementValue(confirmPasswordEl, 'XYZXYZXYYZY#1');

    expect(component.userDataForm.invalid).toBeTrue();
  });

  it('should render company step on click', fakeAsync(() => {
    fixture.detectChanges();

    const stepBtn = el.queryAll(By.css('.step-btn'))[1];
    stepBtn.triggerEventHandler('click', {});
    fixture.detectChanges();
    tick(3000);

    const companyName = TestHelpers.findEl(
      fixture,
      'companyName-test-control',
    ).nativeElement.getAttribute('formcontrolname');

    expect(companyName).toBe('companyName');
    flush();
  }));

  it('should call an action on create', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
    component.onFormSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      RegisterActions.start({
        props: <AuthTypes.Register>{
          user: component.userDataForm.getRawValue(),
          company: component.companyDataForm.getRawValue(),
        },
      }),
    );
  });
});
