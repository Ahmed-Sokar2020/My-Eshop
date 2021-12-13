import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = []
  categories: Category[] = []
  selectedCategory: any[] = [];
  isCategoryPage?: boolean;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.endSubs$))
    .subscribe(params => {
      // Check If User Come From Category Page Or From Products Page
      params.id ? this._getProducts([params.id])
      : this._getProducts() //<<-- If User In Products Page
      params.id ? (this.isCategoryPage = true)
      : (this.isCategoryPage = false)
    })

    this._getCategories();
  }


  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }


  // To Get Filtered Products  If User Come From Category Page
  private _getProducts(filteredCategories?: string[]) {
    this.prodService.getProducts(filteredCategories)
    .pipe(takeUntil(this.endSubs$))
    .subscribe(products => {
      this.products = products
    })
  }


  // To Get Categories If User In Products Page
  private _getCategories() {
    this.catService.getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe(categories => {
      this.categories = categories;
    })
  }


  // To Filter Categories In Products Page
  categoryFilter() {
    this.selectedCategory = this.categories
    .filter(category => category.checked)
    .map(category => category.id)
    this._getProducts(this.selectedCategory);
  }

}
