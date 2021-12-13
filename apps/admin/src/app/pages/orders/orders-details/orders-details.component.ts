import { OrdersService } from '@sokar/orders';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, ORDER_STATUS } from '@sokar/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-orders-details',
  templateUrl: './orders-details.component.html',
  styles: [
  ]
})
export class OrdersDetailsComponent implements OnInit, OnDestroy {
  order: Order | any
  orderStatuses: any = ORDER_STATUS
  selectedStatus: any;
  endSubs: Subject<any> = new Subject;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


// TO map on the (ORDER_STATUS) to change it to Array
// To Show The Status Of The Order in The Order Details Page
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: this.orderStatuses[key].label
      }
    })
  }


  _getOrder() {
    this.route.params
    .pipe(takeUntil(this.endSubs))
    .subscribe(params =>{
      if(params.id) {
        this.ordersService.getOrder(params.id)
        .pipe(takeUntil(this.endSubs))
        .subscribe(order => {
          this.order = order;
          this.selectedStatus = order.status;
        })
      }
    })
  }


// {status: event.value}, this.order.id
  onStatusChange(event: any) {
    this.ordersService.updateOrder({status: event.value}, this.order.id)
    .pipe(takeUntil(this.endSubs))
    .subscribe(
      () => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`Order is Updated`});
    },
      ()=> {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:`Order is not Updated`});
    });
  }



}
