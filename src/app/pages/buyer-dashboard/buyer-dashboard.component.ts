import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Car} from "../../models/car.model";
import {Location} from "@angular/common";
import {BuyerCarsApiService} from "../../services/api/buyer-cars-api.service";
import {BuyerCar} from "../../models/buyer.car";
import {ActivatedRoute} from "@angular/router";
import {AllCarsApiService} from "../../services/api/all-cars-api.service";
import {BuyerApiService} from "../../services/api/buyerApiService";
import {SellerCarDialogComponent} from "../../components/dialogs/seller-car-dialog/seller-car-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  BuyerBuyNewCarDialogComponent, CarData
} from "../../components/dialogs/buyer-buy-new-car-dialog/buyer-buy-new-car-dialog.component";

function getDefaultBalanceForm(): FormGroup {
  return new FormGroup({
    amount: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(1_000_000)
    ]),
  });
}

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent implements OnInit {

  buyerCarsDisplayedColumns: string[] = ['id', 'name', 'qty'];
  allCarsDisplayedColumns: string[] = ['id', 'name', 'qty', 'price', 'actions'];
  buyerCarsDataSource: BuyerCar[] = [];
  allCarsDataSource: Car[] = [];

  balanceForm = getDefaultBalanceForm();
  balance: number = 1000;

  constructor(
    private allCarsAPIService: AllCarsApiService,
    private buyerCarsAPIService: BuyerCarsApiService,
    private buyerApiService: BuyerApiService,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getBuyer();
    this.getAllAvailableCars();
    this.getBuyerCars();
  }

  public getBuyer(): void {
    this.buyerApiService.getCurrent()
      .then(response => response.json())
      .then(result => {
        this.balance = result.balance;
      });
  }

  public getAllAvailableCars(): void {
    // TODO: filter by available
    this.allCarsAPIService.list()
      .then((response: Response) => response.json())
      .then((response: Car[]) => this.allCarsDataSource = response);
  }

  public getBuyerCars(): void {
    this.buyerCarsAPIService.list()
      .then((response: Response) => response.json())
      .then((response: BuyerCar[]) => this.buyerCarsDataSource = response);
  }

  public async onSelectCarToBuy(id: number) {
    const car: Car = await this.allCarsAPIService.get(id)
      .then(response => response.json())
      .then(result => new Car(result.id, result.name, result.price, result.qty, result.isAvailable));

    const buyer = await this.buyerApiService.getCurrent().then(response => response.json());

    const dialogRef = this.dialog.open(BuyerBuyNewCarDialogComponent, {
      width: '750px',
      disableClose: true,
      data: { id: car.id, name: car.name, price: car.price, qty: car.qty }
    });

    dialogRef.afterClosed().subscribe(async (newCar: CarData) => {
      if (!newCar) {
        return;
      }

      const car = await this.allCarsAPIService.get(id)
        .then(response => response.json())
        .then(result => new Car(result.id, result.name, result.price, result.qty, result.isAvailable));

      car.changeQty(-newCar.qty);

      const updateShopCarPromise = this.allCarsAPIService.update(car.id, car);
      const addBuyerCarPromise = this.buyerCarsAPIService.create({ name: car.name, qty: newCar.qty });
      const updateBuyerBalancePromise = this.buyerApiService
        .getCurrent()
        .then(response => response.json())
        .then(buyer => this.buyerApiService.setBalance(buyer.id, buyer.balance -car.price * newCar.qty));

      Promise.all([updateShopCarPromise, addBuyerCarPromise, updateBuyerBalancePromise]).then(() => {
        this.getBuyerCars();
        this.getAllAvailableCars();
        this.getBuyer();
      });
    });
  }

  public async onUpdateBalance() {
    const amountElement = this.balanceForm.get('amount');
    if (!amountElement || amountElement.errors) {
      return;
    }

    const amount = amountElement.value;
    const buyer = await this.buyerApiService.getCurrent().then(response => response.json());
    await this.buyerApiService.setBalance(buyer.id, amount)
      .then(() => {
        this.balanceForm = getDefaultBalanceForm();
        this.getBuyer();
      });
  }
}
