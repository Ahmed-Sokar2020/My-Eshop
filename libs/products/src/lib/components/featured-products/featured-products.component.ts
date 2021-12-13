import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: []
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject

  constructor(private featProducts: ProductsService) { }


  ngOnInit(): void {
    this._getFeaturedProducts();
  }


  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }


  private _getFeaturedProducts() {
     this.featProducts.getFeaturedProducts()
     .pipe(takeUntil(this.endSubs$))
     .subscribe(products => {
       this.featuredProducts = products
     })
  }
}
