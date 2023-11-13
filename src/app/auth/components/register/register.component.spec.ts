import { RegisterComponent } from './register.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CreateInitialState } from '../../../share/types/store.types';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { I18nService } from '@/core/i18n/i18n.service';
import { I18nServiceTest } from '@/core/i18n/i18n.service.test';
import { TestHelpers } from '@/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;

  let store: Store;
  const initalState = CreateInitialState({});

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
        provideMockStore({}),
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

    store = TestBed.inject<Store>(Store);
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

  it('should emails match', async () => {
    await fixture.whenStable();
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

  it('should emails be invalid', async () => {
    await fixture.whenStable();
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

  it('should passwords match', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const passwordEl = TestHelpers.findEl(fixture, 'password-test-control')
      ?.nativeElement.childNodes[0].childNodes[0];

    const confirmPasswordEl = TestHelpers.findEl(
      fixture,
      'confirm-password-test-control',
    )?.nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(passwordEl, 'Warszawa#1');
    TestHelpers.setFieldElementValue(confirmPasswordEl, 'Warszawa#1');

    expect(component.userDataForm.valid).toBeTrue();
  });

  it('should passwords be different', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const passwordEl = TestHelpers.findEl(fixture, 'password-test-control')
      ?.nativeElement.childNodes[0].childNodes[0];

    const confirmPasswordEl = TestHelpers.findEl(
      fixture,
      'confirm-password-test-control',
    )?.nativeElement.childNodes[0].childNodes[0];

    TestHelpers.setFieldElementValue(passwordEl, 'Warszawa#1');
    TestHelpers.setFieldElementValue(confirmPasswordEl, 'Krakowww#1');

    expect(component.userDataForm.invalid).toBeTrue();
  });
});
