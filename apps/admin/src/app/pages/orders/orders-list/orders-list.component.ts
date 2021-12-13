/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, ORDER_STATUS , OrdersService } from '@sokar/orders'
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  orderStatus: any = ORDER_STATUS;
  endSubs: Subject<any> = new Subject;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this._getOrders();
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  private _getOrders() {
    this.ordersService.getOrders()
    .pipe(takeUntil(this.endSubs))
    .subscribe(orders => {
      this.orders = orders;
    })
  }


  // To subscribe on the deleted Order
  deleteOrders(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId)
        .pipe(takeUntil(this.endSubs))
        .subscribe(
          () => {
            // vvv-- To delete Order after success case immediatly not later
            this._getOrders();
            this.messageService.add({severity:'success',summary:'Success',
            detail:`Order is deleted`})},
          () => {
            this.messageService.add({severity:'error', summary:'Erorr', detail:'Order is not deleted'});
          }
        )
      }
    });
  }


  showOrders(orderId: string) {
    this.router.navigateByUrl(`orders/details/${orderId}`)
  }


}
