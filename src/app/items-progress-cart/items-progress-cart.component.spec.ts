import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsProgressCartComponent } from './items-progress-cart.component';

describe('ItemsProgressCartComponent', () => {
  let component: ItemsProgressCartComponent;
  let fixture: ComponentFixture<ItemsProgressCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsProgressCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsProgressCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
