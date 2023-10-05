import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerLogoComponent } from './burger-logo.component';

describe('BurgerLogoComponent', () => {
  let component: BurgerLogoComponent;
  let fixture: ComponentFixture<BurgerLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BurgerLogoComponent]
    });
    fixture = TestBed.createComponent(BurgerLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
