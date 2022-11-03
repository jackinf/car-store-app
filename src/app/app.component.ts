import {Component, OnInit} from '@angular/core';
import {Car} from "./models/car.model";
import {CarApiService} from "./services/car-api-service.service";
import {CARS} from "./mock-car-list";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Car store'
  ngOnInit(): void {}
}

/*
* Car rental app:
*  View available cars and their info
*  Rent a car to user's name
*  View rented cars
*  Return cars*/
