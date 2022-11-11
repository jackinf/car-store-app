import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerBuyNewCarDialogComponent } from './buyer-buy-new-car-dialog.component';

describe('BuyerBuyNewCarDialogComponent', () => {
  let component: BuyerBuyNewCarDialogComponent;
  let fixture: ComponentFixture<BuyerBuyNewCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerBuyNewCarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerBuyNewCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
