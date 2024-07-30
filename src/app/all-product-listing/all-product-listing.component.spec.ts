import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductListingComponent } from './all-product-listing.component';

describe('AllProductListingComponent', () => {
  let component: AllProductListingComponent;
  let fixture: ComponentFixture<AllProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
