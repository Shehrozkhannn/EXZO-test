import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartProductsComponent } from './add-to-cart-products.component';

describe('AddToCartProductsComponent', () => {
  let component: AddToCartProductsComponent;
  let fixture: ComponentFixture<AddToCartProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCartProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToCartProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
