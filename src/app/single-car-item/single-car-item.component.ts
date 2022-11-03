import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from "../models/car.model";

@Component({
  selector: 'app-single-car-item',
  templateUrl: './single-car-item.component.html',
  styleUrls: ['./single-car-item.component.css']
})
export class SingleCarItemComponent implements OnInit {
  isEditing: boolean = false;
 @Input() carItem: Car= new Car('', 0, true);
 @Output() onDeleteCar: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
