import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponentComponent} from "../pages/page-not-found-component/page-not-found-component.component";
import {MainDashboardComponent} from "../pages/main-dashboard/main-dashboard.component";
import {SellerDashboardComponent} from "../pages/seller-dashboard/seller-dashboard.component";
import {BuyerDashboardComponent} from "../pages/buyer-dashboard/buyer-dashboard.component";

const routes: Routes = [
  {path: '', component: MainDashboardComponent},
  {path: 'seller/dashboard', component: SellerDashboardComponent},
  {path: 'buyer/dashboard', component: BuyerDashboardComponent},
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
