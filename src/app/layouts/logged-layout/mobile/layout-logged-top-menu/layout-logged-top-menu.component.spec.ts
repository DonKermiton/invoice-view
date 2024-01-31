import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoggedTopMenuComponent } from './layout-logged-top-menu.component';

describe('LayoutLoggedTopMenuComponent', () => {
  let component: LayoutLoggedTopMenuComponent;
  let fixture: ComponentFixture<LayoutLoggedTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutLoggedTopMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutLoggedTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
