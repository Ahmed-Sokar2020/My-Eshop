import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styles: []
})
export class ThankyouPageComponent implements OnInit {

  constructor(
    private OrdersService: OrdersService,
    private CartService: CartService) { }

  ngOnInit(): void {
    const orderData = this.OrdersService.getCachedOrderData();

    this.OrdersService.createOrder(orderData).subscribe(() => {
      this.CartService.emptyCart();
      this.OrdersService.removeCachedOrderData();
    })

  }

}
