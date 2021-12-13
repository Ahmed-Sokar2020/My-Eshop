import { OrdersService } from './../../services/orders.service';
import { CartService } from './../../services/cart.service';
import { OrderItem } from './../../models/order-item';
import {  Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '@sokar/users';
import { Subject } from 'rxjs';
import { Order } from '../../models/order';
import { Cart } from '../../models/cart';
import { ORDER_STATUS } from '../../order.constants';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  userId?: string;
  orderItems: OrderItem[] | any = [];
  countries: any = [];
  endSubs$: Subject<any> = new Subject;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,

    ) {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      street: ['', [Validators.required]],
      apartment: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
   }


  ngOnInit(): void {
    this._getCountries();
    this._autoFillUserData();
    this._getCartItems();
  }


  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }


  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }


  placeOrder() {
    this.isSubmitted = true;
    if(this.checkoutFormGroup.invalid) return;

    const order: Order = {
      orderItems: this.orderItems,
      shippingAdress1: this.checkoutForm.street.value,
      shippingAdress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: Object.keys(ORDER_STATUS)[0],
      user: this.userId,
      dateOrdered: `${Date.now()}`
    }

    // cache the Order Data in the Localstorage
    this.ordersService.cacheOrderData(order);

    // Make the User Redirect To Payment Gateway
    this.ordersService.createCheckoutSession(this.orderItems)
    .subscribe(error => {
      if(error)
       console.log(`Error in Redirecting to Payment Gateway, ${error}`);
    })

  }


  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map(item => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    })
  }


  // To get Countries in Dropdown List in Users-form Page
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }


  backToCart() {
    this.router.navigate(['/cart']);
  }


  // auto Fill For User Data in The Form in Checkout Page
  private _autoFillUserData() {
    this.usersService.observeCurrentUser()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((user) => {
      if(user) {
        this.userId = user.id;
        this.checkoutForm.name.setValue(user.name);
        this.checkoutForm.email.setValue(user.email);
        this.checkoutForm.phone.setValue(user.phone);
        this.checkoutForm.street.setValue(user.street);
        this.checkoutForm.apartment.setValue(user.apartment);
        this.checkoutForm.zip.setValue(user.zip);
        this.checkoutForm.city.setValue(user.city);
        this.checkoutForm.country.setValue(user.country);
      }
    })
  }

}
