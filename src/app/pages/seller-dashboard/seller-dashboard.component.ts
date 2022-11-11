import {Component, OnInit} from '@angular/core';
import {Car} from "../../models/car.model";
import {AllCarsApiService} from "../../services/api/all-cars-api.service";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  CarData,
  SellerCarDialogComponent
} from "../../components/dialogs/seller-add-new-car-dialog/seller-car-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  title = 'Car store';

  displayedColumns: string[] = ['id', 'name', 'price', 'qty', 'actions'];
  dataSource: Car[] = [];

  constructor(
    private carAPIService: AllCarsApiService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.reset();
  }

  public startAddingNewCar(): void {
    const dialogRef = this.dialog.open(SellerCarDialogComponent, {
      width: '750px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newCar: CarData | null) => {
      if (!newCar) {
        return;
      }

      this.carAPIService.create({
        name: newCar.name,
        price: newCar.price,
        qty: newCar.qty,
        isAvailable: newCar.isAvailable
      })
        .then(response => response.json())
        .then(() => this.reset());
    });
  }

  public reset() {
    this.getAllAvailableCars();
  }

  public getAllAvailableCars(): void {
    this.carAPIService.list()
      .then((response: Response) => response.json())
      .then((response: Car[]) => this.dataSource = response);
  }

  public async onEdit(id: any) {
    const car: Car = await this.carAPIService.get(id)
      .then((response: Response) => response.json());

    const dialogRef = this.dialog.open(SellerCarDialogComponent, {
      width: '750px',
      disableClose: true,
      data: {name: car.name, price: car.price, qty: car.qty, isAvailable: car.isAvailable},
    });

    dialogRef.afterClosed().subscribe((newCar: CarData | null) => {
      if (!newCar) {
        return;
      }

      this.carAPIService.update(id, {
        name: newCar.name,
        price: newCar.price,
        qty: newCar.qty,
        isAvailable: newCar.isAvailable
      })
        .then(response => response.json())
        .then(() => this.reset());
    });
  }

  public onDelete(id: any) {
    this.carAPIService.delete(id).then(() => this.reset())
  }
}
