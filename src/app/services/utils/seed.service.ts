import { Injectable } from '@angular/core';
import {AllCarsApiService} from "../api/all-cars-api.service";
import {BuyerService} from "../api/buyer.service";

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(
    private carAPIService: AllCarsApiService,
    private buyerAPIService: BuyerService,
  ) { }

  public async trySeedBuyer() {
    const response = await this.buyerAPIService.list();
    const items = await response.json();

    if (items.length > 0) {
      return;
    }

    await this.buyerAPIService.create({
      "name": "John",
      "email": "john@test.com",
      "balance": 10000
    });
  }

  public async trySeedAllCars() {
    const response = await this.carAPIService.list();
    const items = await response.json();

    if (items.length > 0) {
      return;
    }

    await this.carAPIService.create({ name: "car 01",  price: 1000,  qty: 3,  isAvailable: true, });
    await this.carAPIService.create({ name: "car 02",  price: 2000,  qty: 2,  isAvailable: false, });
    await this.carAPIService.create({ name: "car 03",  price: 3000,  qty: 4,  isAvailable: true, });
  }
}
