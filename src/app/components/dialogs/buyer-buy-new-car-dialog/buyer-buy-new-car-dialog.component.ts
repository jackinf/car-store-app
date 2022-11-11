import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BuyerApiService} from "../../../services/api/buyerApiService";

function getDefaultBuyCarForm(): FormGroup {
  return new FormGroup({
    qty: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(10)
    ]),
  });
}

export interface CarData {
  id: number;
  name: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-buyer-buy-new-car-dialog',
  templateUrl: './buyer-buy-new-car-dialog.component.html',
  styleUrls: ['./buyer-buy-new-car-dialog.component.css']
})
export class BuyerBuyNewCarDialogComponent implements OnInit {

  buyCarForm = getDefaultBuyCarForm();

  errors = {
    qtyHasErrors: () => Boolean(this.buyCarForm.get('qty')?.errors),
    anyErrors: () => this.errors.qtyHasErrors(),

    getForQty: () => {
      const elem = this.buyCarForm.get('qty');
      if (elem?.hasError('required')) {
        return 'You must enter a value';
      }

      if (elem?.hasError('min')) {
        return 'Price must be at least 1';
      }

      if (elem?.hasError('max')) {
        return 'Price must be at most 10';
      }

      return '';
    },
  }

  constructor(
    public dialogRef: MatDialogRef<BuyerBuyNewCarDialogComponent>,
    private buyerApiService: BuyerApiService,
    @Inject(MAT_DIALOG_DATA) public selectedCar: CarData,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  public async onBuyCarSubmit(): Promise<void> {
    if (this.errors.anyErrors()) {
      return;
    }

    if (this.selectedCar === null) {
      // TODO: show error
      return;
    }

    const qty = this.buyCarForm.get('qty')?.value ?? 0;
    if (this.selectedCar.qty < qty) {
      console.error('Not enough cars in stock');
      // TODO: show error
      return;
    }

    const totalToPay = this.selectedCar.price * qty;

    const buyer = await this.buyerApiService.getCurrent().then(response => response.json());

    if (buyer.balance < totalToPay) {
      console.error('Not enough money');
      // TODO: show error
      return;
    }

    this.dialogRef.close(this.buyCarForm.value as CarData)
  }
}
