import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCarItemComponent } from './single-car-item.component';

describe('SingleCarItemComponent', () => {
  let component: SingleCarItemComponent;
  let fixture: ComponentFixture<SingleCarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCarItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
