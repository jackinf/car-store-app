import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule} from "./app-routing/app-routing.module";
import { AppComponent } from './app.component';
import { SingleCarItemComponent } from './single-car-item/single-car-item.component';
import {FormsModule} from "@angular/forms";
import { MyCarsComponent } from './my-cars/my-cars.component';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    SingleCarItemComponent,
    MyCarsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLinkWithHref
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
