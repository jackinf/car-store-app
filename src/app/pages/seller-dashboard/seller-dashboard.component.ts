import { Component, OnInit } from '@angular/core';
import {Car} from "../../models/car.model";
import {AllCarsApiService} from "../../services/api/all-cars-api.service";
import {Location} from "@angular/common";

function getDefault() {
  return {
    name: '',
    price: 0,
    qty: 0,
    isAvailable: false
  };
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

  newCar = getDefault();

  constructor(
    private carAPIService: AllCarsApiService,
    private location: Location
    // private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getAllAvailableCars();
  }

  goBack() {
    this.location.back();
  }

  public getAllAvailableCars() : void {
    this.carAPIService.list()
      .then((response: Response) => response.json())
      .then((response: Car[]) => this.dataSource = response)
      .catch(console.log);
  }

  public addCar(): void {
    if (this.newCar.name.length < 2 && this.newCar.name.length > 100) {
      alert("Please provide a car name with length between 2 and 100 letters")
      return;
    }

    if (this.newCar.price < 300 && this.newCar.price > 1_000_000) {
      alert("Please provide a price between 300€ and 1 000 000€")
    }

    if (this.newCar.qty < 1 && this.newCar.qty > 100) {
      alert("Please provide a quantity between 1 and 100")
    }

    const carItem: Car = new Car(
      this.newCar.name, this.newCar.price, this.newCar.qty, this.newCar.isAvailable
    );

    this.carAPIService.create(carItem)
      .then(() => {
        this.dataSource.push(carItem);
        this.newCar = getDefault();
      })
      .then(this.getAllAvailableCars)
      .catch(console.log)
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
