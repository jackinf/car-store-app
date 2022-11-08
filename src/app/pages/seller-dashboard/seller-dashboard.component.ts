import {Component, OnInit} from '@angular/core';
import {Car} from "../../models/car.model";
import {AllCarsApiService} from "../../services/api/all-cars-api.service";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

function getDefaultForm(): FormGroup {
  return new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(300),
      Validators.max(100_000)
    ]),
    qty: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(10)
    ]),
    isAvailable: new FormControl(false, Validators.required)
  });
}

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  title = 'Car store';

  displayedColumns: string[] = ['id', 'name', 'price', 'qty'];
  dataSource: Car[] = [];

  constructor(
    private carAPIService: AllCarsApiService,
    private location: Location
    // private route: ActivatedRoute
  ) {
  }

  addCarForm = getDefaultForm();

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

  ngOnInit(): void {
    this.getAllAvailableCars();
  }

  public getAllAvailableCars(): void {
    this.carAPIService.list()
      .then((response: Response) => response.json())
      .then((response: Car[]) => this.dataSource = response)
      .catch(console.log);
  }

  public onAddCarSubmit(): void {
    if (this.errors.anyErrors()) {
      return;
    }

    const newCar = this.addCarForm.value;
    console.log(newCar);

    const carItem: Car = new Car(
      newCar.name, newCar.price, newCar.qty, newCar.isAvailable
    );

    this.carAPIService.create(carItem)
      .then(() => {
        this.addCarForm = getDefaultForm();
        this.dataSource.push(carItem);
      })
      .then(this.getAllAvailableCars);
  }

  public deleteCar(id?: string): void {
    if (!id) {
      alert('Error, cannot delete this car');
      return;
    }

    this.carAPIService.delete(id)
      .then(this.getAllAvailableCars)
      .catch(console.log)
  }
}
