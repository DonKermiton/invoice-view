import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDefaultItemComponent } from './select-default-item.component';

describe('SelectDefaultItemComponent', () => {
  let component: SelectDefaultItemComponent;
  let fixture: ComponentFixture<SelectDefaultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDefaultItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectDefaultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
