import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from './../../services/orders.service';
import { cartItemDetails } from '../../models/cart';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetails: cartItemDetails[] = [];
  cartCount = 0;
  endSubs: Subject<any> = new Subject;

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    ) { }


  ngOnInit(): void {
    this._getCartDetails();
  }


  ngOnDestroy()  {
    this.endSubs.next();
    this.endSubs.complete();

  }


  private _getCartDetails()  {
    this.cartService.cart$
    .pipe(takeUntil(this.endSubs))
    .subscribe(resCart => {
      this.cartItemsDetails = [];
      this.cartCount = resCart.items?.length ?? 0;
      resCart.items?.map(cartItem => {
        this.ordersService.getProduct(cartItem.productId)
        .subscribe((resProduct) => {
          this.cartItemsDetails.push({
            product: resProduct,
            quantity: cartItem.quantity
          })
        })
      })
    } )
  }


  backToShop() {
    this.router.navigate(['/products']);
  }


  deleteCartItem(cartItem: cartItemDetails) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }


  updateCartItemQuantity(event: any, cartItem: cartItemDetails) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)
  }

}
