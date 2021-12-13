import { Component, OnInit } from '@angular/core';
import { CartService } from '@sokar/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ecommerce-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.cartService.cart$.subscribe(
      () => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`Cart is Updated Successfully`});
      },
      () => {
        this.messageService.add({
          severity:'error',
          summary:'Erorr',
          detail:'Cart is not Updated'});
      });

  }

}
