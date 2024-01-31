import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopLoggedSideMenuComponent } from './desktop-logged-side-menu.component';

describe('DesktopLoggedSideMenuComponent', () => {
  let component: DesktopLoggedSideMenuComponent;
  let fixture: ComponentFixture<DesktopLoggedSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopLoggedSideMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesktopLoggedSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
