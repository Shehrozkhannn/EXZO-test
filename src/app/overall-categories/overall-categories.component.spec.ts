import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallCategoriesComponent } from './overall-categories.component';

describe('OverallCategoriesComponent', () => {
  let component: OverallCategoriesComponent;
  let fixture: ComponentFixture<OverallCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverallCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
