import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedOrderDetailsComponent } from './placed-order-details.component';

describe('PlacedOrderDetailsComponent', () => {
  let component: PlacedOrderDetailsComponent;
  let fixture: ComponentFixture<PlacedOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacedOrderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacedOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
