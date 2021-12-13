import { Subject } from 'rxjs';
import { CartItem, CartService } from '@sokar/orders';
import { Product } from './../../models/product';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit, OnDestroy {

  @Input() products?: Product;
  endSubs: Subject<any> = new Subject;

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();

  }


  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.products?.id,
      quantity: 1
    }

    this.cartService.setCartItem(cartItem);

  }


}
