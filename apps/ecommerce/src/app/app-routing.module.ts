import { OrdersModule } from '@sokar/orders';
import { ProductsModule } from '@sokar/products';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersModule } from '@sokar/users';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {initialNavigation:'enabledBlocking'}),
    ProductsModule,
    OrdersModule,
    UsersModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
