import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCategoryMenuComponent } from './mobile-category-menu.component';

describe('MobileCategoryMenuComponent', () => {
  let component: MobileCategoryMenuComponent;
  let fixture: ComponentFixture<MobileCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileCategoryMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
