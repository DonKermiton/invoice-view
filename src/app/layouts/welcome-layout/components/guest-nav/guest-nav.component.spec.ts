import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestNavComponent } from './guest-nav.component';

describe('GuestNavComponent', () => {
  let component: GuestNavComponent;
  let fixture: ComponentFixture<GuestNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GuestNavComponent]
    });
    fixture = TestBed.createComponent(GuestNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
