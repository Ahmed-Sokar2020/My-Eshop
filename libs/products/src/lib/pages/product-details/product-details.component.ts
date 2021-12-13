import { CartItem } from '@sokar/orders';
import { CartService } from '@sokar/orders';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product?: Product | any; //<<-- Only One Product From Backend
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }


  ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.endSubs$))
    .subscribe(params => {
      if(params.id) {
        this._getProduct(params.id)
      }

    })
  }


  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }


  private _getProduct(id: string) {
    this.prodService.getProduct(id)
    .pipe(takeUntil(this.endSubs$))
    .subscribe(product => {
      this.product = product
    })
  }


  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }

    this.cartService.setCartItem(cartItem);
  }


}
