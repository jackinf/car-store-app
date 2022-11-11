import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";

function getDefaultCarData() {
  return {
    name: '',
    price: 0,
    qty: 0,
    isAvailable: false
  };
}

function getDefaultForm(data: CarData): FormGroup {
  return new FormGroup({
    name: new FormControl(data.name, Validators.required),
    price: new FormControl(data.price, [
      Validators.required,
      Validators.min(300),
      Validators.max(100_000)
    ]),
    qty: new FormControl(data.qty, [
      Validators.required,
      Validators.min(1),
      Validators.max(10)
    ]),
    isAvailable: new FormControl(data.isAvailable, Validators.required)
  });
}

export interface CarData {
  name: string;
  price: number;
  qty: number;
  isAvailable: boolean;
}

@Component({
  selector: 'app-seller-car-dialog',
  templateUrl: './seller-car-dialog.component.html',
  styleUrls: ['./seller-car-dialog.component.css']
})
export class SellerCarDialogComponent implements OnInit {
  addCarForm = getDefaultForm(getDefaultCarData());

  // For displaying error messages
  errors = {
    nameHasErrors: () => Boolean(this.addCarForm.get('name')?.errors),
    priceHasErrors: () => Boolean(this.addCarForm.get('price')?.errors),
    qtyHasErrors: () => Boolean(this.addCarForm.get('qty')?.errors),
    anyErrors: () => this.errors.nameHasErrors() || this.errors.priceHasErrors() || this.errors.qtyHasErrors(),

    getForName: () => this.addCarForm.get('name')?.hasError('required') ? 'You must enter a value' : '',
    getForPrice: () => {
      const elem = this.addCarForm.get('price');
      if (elem?.hasError('required')) {
        return 'You must enter a value';
      }


      if (elem?.hasError('min')) {
        return 'Price must be at least 300';
      }

      if (elem?.hasError('max')) {
        return 'Price must be at most 100,000';
      }

      return '';
    },
    getForQty: () => {
      const elem = this.addCarForm.get('qty');
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
    public dialogRef: MatDialogRef<SellerCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarData,
  ) {
  }

  ngOnInit(): void {
    this.addCarForm = getDefaultForm(this.data || getDefaultCarData());
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  public onAddCarSubmit(): void {
    if (this.errors.anyErrors()) {
      return;
    }

    this.dialogRef.close(this.addCarForm.value as CarData)
  }
}
