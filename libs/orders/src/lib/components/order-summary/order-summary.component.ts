import { Router } from '@angular/router';
import { OrdersService } from './../../services/orders.service';
import { CartService } from '../../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice?: number | any;
  isCheckout = false;
  endSubs$: Subject<any> = new Subject;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    // To Check If User in Cart Page Or in Checkout Page
    this.router.url.includes('checkout') ?
    this.isCheckout = true : this.isCheckout = false
  }


  ngOnInit(): void {
    this._getOrdersSummary();
  }


  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();

  }


  private _getOrdersSummary() {
    this.cartService.cart$
    .pipe(takeUntil(this.endSubs$))
    .subscribe(cart => {
      this.totalPrice = 0;
      if(cart) {
       cart.items?.map(item => {
         this.ordersService.getProduct(item.productId)
         .pipe(take(1))
         .subscribe(product => {
          this.totalPrice += product.price * item.quantity
         })
       })
      }
    })
  }


}
