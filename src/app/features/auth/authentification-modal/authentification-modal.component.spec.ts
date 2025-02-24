import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationModalComponent } from './authentification-modal.component';

describe('AuthentificationModalComponent', () => {
  let component: AuthentificationModalComponent;
  let fixture: ComponentFixture<AuthentificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthentificationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthentificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
