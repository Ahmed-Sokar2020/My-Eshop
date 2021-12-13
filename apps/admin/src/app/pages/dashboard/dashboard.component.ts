import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@sokar/orders';
import { ProductsService } from '@sokar/products';
import { UsersService } from '@sokar/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',

})
export class DashboardComponent implements OnInit {

  statistics: any = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    combineLatest([
     this.ordersService.getOrdersCount(),
     this.productService.getProductsCount(),
     this.userService.getUsersCount(),
     this.ordersService.getTotalSales(),
   ]).subscribe((values: any) => {
     this.statistics = values;
   });
  }

}



