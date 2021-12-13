/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@sokar/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endSubs: Subject<any> = new Subject;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this._getProducts();
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  private _getProducts() {
    this.productsService.getProducts()
    .pipe(takeUntil(this.endSubs))
    .subscribe(products => {
      this.products = products;
    })
  }


  // To subscribe on the deleted Product
  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId)
        .pipe(takeUntil(this.endSubs))
        .subscribe(
          () => {
            // vvv-- To delete Product after success case immediatly not later
            this._getProducts();
            this.messageService.add({severity:'success',summary:'Success',
            detail:`Product is deleted`})}
          ,
          () => {
            this.messageService.add({severity:'error', summary:'Erorr', detail:'Product is not deleted created'});
          }
        )

      }
  });

  }

  // To navigate to the editProduct page
  editProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`)
  }

}
