import { Component, OnInit } from '@angular/core';
import {Car} from "../models/car.model";
import {CarApiService} from "../services/car-api-service.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.css']
})
export class MyCarsComponent implements OnInit {

  title = 'Car store';

  carList: Car[] = [];

  newCarName: string = '';
  newCarPrice: number = 0;

  constructor(
    private carAPIService: CarApiService,
    private location: Location
    // private route: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.getAllAvailableCars();
  }

  public getAllAvailableCars() : void {
    this.carAPIService.getAllCars()
      .then((response: Response) => response.json())
      .then((response: Car[]) => this.carList = response)
      .catch(console.log);
  }

  public addCar(): void {
    if (this.newCarName.length < 2) {
      alert("Please provide a car name")
      return;
    }
    if (this.newCarPrice < 300) {
      alert("Please provide a price at minimum of 300€")
    }
    const carItem: Car = new Car(
      this.newCarName, this.newCarPrice, false
    );

    this.carList.push(carItem);

    this.newCarName = '';
    this.newCarPrice = 0;

    this.carAPIService.createCar(carItem)
      .then(() => {
        this.getAllAvailableCars();
      }).catch(console.log)
  }

  goBack() {
    this.location.back();
  }
  public deleteCarItem(carName: string): void {
    this.carAPIService.deleteCar(carName)
      .then(() => {this.getAllAvailableCars();})
      .catch(console.log)
  }
}
