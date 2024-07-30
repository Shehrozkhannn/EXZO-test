import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotOfferComponent } from './hot-offer.component';

describe('HotOfferComponent', () => {
  let component: HotOfferComponent;
  let fixture: ComponentFixture<HotOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
