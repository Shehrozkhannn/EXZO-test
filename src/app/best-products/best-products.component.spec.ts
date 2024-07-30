import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestProductsComponent } from './best-products.component';

describe('BestProductsComponent', () => {
  let component: BestProductsComponent;
  let fixture: ComponentFixture<BestProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
