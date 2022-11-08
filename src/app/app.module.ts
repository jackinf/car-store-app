import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {SellerDashboardComponent} from './pages/seller-dashboard/seller-dashboard.component';
import {BuyerDashboardComponent} from './pages/buyer-dashboard/buyer-dashboard.component';
import {MainDashboardComponent} from './pages/main-dashboard/main-dashboard.component';
import {PageNotFoundComponentComponent} from './pages/page-not-found-component/page-not-found-component.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {HeaderComponent} from './navigation/header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    SellerDashboardComponent,
    BuyerDashboardComponent,
    PageNotFoundComponentComponent,
    SidenavListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLinkWithHref,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSliderModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
