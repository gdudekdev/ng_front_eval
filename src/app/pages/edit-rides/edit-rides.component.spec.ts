import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRidesComponent } from './edit-rides.component';

describe('EditRidesComponent', () => {
  let component: EditRidesComponent;
  let fixture: ComponentFixture<EditRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
