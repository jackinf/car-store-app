import {Component, OnInit} from '@angular/core';
import {SeedService} from "./services/utils/seed.service";
import {environment} from '../environments/environment';

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
    if (environment.seed) {
      (async () => {
        await this.seedService.trySeedBuyer();
        await this.seedService.trySeedAllCars();
      })();
    }
  }
}
