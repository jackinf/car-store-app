import {Component, OnInit} from '@angular/core';
import {SeedService} from "./services/utils/seed.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Car store'

  constructor(private seedService: SeedService) {
  }

  ngOnInit(): void {
    (async () => {
      await this.seedService.trySeedBuyer();
      await this.seedService.trySeedAllCars();
    })();
  }
}
