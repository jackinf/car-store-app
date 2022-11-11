import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCarDialogComponent } from './seller-car-dialog.component';

describe('SellerAddNewCarComponent', () => {
  let component: SellerCarDialogComponent;
  let fixture: ComponentFixture<SellerCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerCarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
