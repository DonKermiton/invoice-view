import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SingleHttpStore } from '@/store/single-http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { I18nService } from '@/core/i18n/i18n.service';
import { I18nServiceTest } from '@/core/i18n/i18n.service.test';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRoutes } from '../../index';
import { Location } from '@angular/common';
import { TestHelpers } from '@/testing';
import { By } from '@angular/platform-browser';
import { ManualLoginActions, RegisterActions } from '../../store/auth.actions';
import * as AuthTypes from '../../auth.types';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let router: Router;
  let location: Location;

  let store: MockStore;
  const initialState = SingleHttpStore.CreateInitialState({});

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(AuthRoutes.AuthRoutes),
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
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      })
      .catch(console.error);

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    store = TestBed.inject(MockStore);
    router.initialNavigation();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect user to create account', fakeAsync(() => {
    TestHelpers.click(fixture, 'create-account');
    tick();
    expect(location.path()).toBe('/register');
  }));

  describe('Email control tests', () => {
    let el: DebugElement;

    beforeEach(() => {
      fixture.detectChanges();
      el = TestHelpers.findEl(fixture, 'email-test-control').query(
        By.css('input'),
      );
    });

    it('should email be valid', () => {
      TestHelpers.setFieldElementValue(el.nativeElement, 'test@test.eu');
      expect(component.loginForm.get('email')?.valid).toBeTrue();
    });

    it('should email be invalid', () => {
      TestHelpers.setFieldElementValue(el.nativeElement, 'test');
      expect(component.loginForm.get('email')?.valid).toBeFalse();
    });
  });

  describe('Password control tests', () => {
    let el: DebugElement;

    beforeEach(() => {
      fixture.detectChanges();
      el = TestHelpers.findEl(fixture, 'password-test-control').query(
        By.css('input'),
      );
    });

    it('should password be valid', () => {
      TestHelpers.setFieldElementValue(el.nativeElement, 'TestTest#1');
      expect(component.loginForm.get('password')?.valid).toBeTrue();
    });

    it('should password be invalid', () => {
      TestHelpers.setFieldElementValue(el.nativeElement, 'test');
      expect(component.loginForm.get('password')?.valid).toBeFalse();
    });
  });

  describe('Login action tests', () => {
    let email: DebugElement;
    let password: DebugElement;

    beforeEach(() => {
      fixture.detectChanges();
      email = TestHelpers.findEl(fixture, 'email-test-control').query(
        By.css('input'),
      );
      password = TestHelpers.findEl(fixture, 'password-test-control').query(
        By.css('input'),
      );
      TestHelpers.setFieldElementValue(email.nativeElement, 'test@test.pl');
      TestHelpers.setFieldElementValue(password.nativeElement, 'Password#1');
    });

    it('should call an action on login', () => {
      const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
      fixture.detectChanges();
      component.login();

      const emailFormValue: string | null =
        component.loginForm.get('email')?.value || null;
      const passwordFormValue: string | null =
        component.loginForm.get('password')?.value || null;

      expect(dispatchSpy).toHaveBeenCalledWith(
        ManualLoginActions.start({
          props: <AuthTypes.Login>{
            email: emailFormValue,
            password: passwordFormValue,
          },
        }),
      );
    });
  });
});
