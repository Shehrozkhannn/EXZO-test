import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSliderImgComponent } from './main-slider-img.component';

describe('MainSliderImgComponent', () => {
  let component: MainSliderImgComponent;
  let fixture: ComponentFixture<MainSliderImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSliderImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSliderImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
