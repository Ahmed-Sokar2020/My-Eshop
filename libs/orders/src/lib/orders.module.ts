import { AuthGuard } from '@sokar/users';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

import {BadgeModule} from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ThankyouPageComponent } from './pages/thankyou-page/thankyou-page.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';

const ordersRoutes: Routes = [
  {
    path: "cart",
    component: CartPageComponent
  },
  {
    path: "checkout",
    canActivate: [AuthGuard],
    component: CheckoutPageComponent
  },
  {
    path: "success",
    component: ThankyouPageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(ordersRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    InputMaskModule,
    InputTextModule,
    DropdownModule
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankyouPageComponent,
    UserIconComponent
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankyouPageComponent,
    UserIconComponent
  ]
})
export class OrdersModule {

  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }



}
