import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';
import { StripeService } from 'ngx-stripe';
import { OrderItem } from './../models/order-item';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // apiURLOrders = 'http://localhost:3000/api/v1/orders';
  apiURLOrders = `${environment.apiURL}/orders`;
  apiURLProducts = `${environment.apiURL}/products`;

  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
    ) { }

  // Get Method for the list of Orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  // Get Method for one Order for Veiwing the Order Details
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  //  Post Method for the created Order In The Checkout Page
  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  //  Put Method for updating any Order
  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order>{
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}` , orderStatus);
  }

  // Delete Method for Deleting any Order
  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  // To Count the Orders
  getOrdersCount(): Observable<{orderCount: number}> {
    return this.http
      .get<{orderCount: number}>(`${this.apiURLOrders}/get/count`)
      .pipe();
  }

  // To Count the TotalSales of the Orders
  getTotalSales(): Observable<{totalSales: number}> {
    return this.http
      .get<{totalSales: number}>(`${this.apiURLOrders}/get/totalsales`)
      .pipe();
  }


  // Get Method for one Product for Updating(Editing)
  getProduct(productId?: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }


  // To Cache the Order Data in the Localstorage
  cacheOrderData(order: Order) {
    localStorage.setItem('orderData',JSON.stringify(order) );
  }


  // To Create Checkout Session and redirect To Checkout for Payment
  createCheckoutSession(orderItem: OrderItem[]): Observable<any> {
  return this.http.post<any>(`${this.apiURLOrders}/create-checkout-session`, orderItem)
     .pipe(switchMap((session: {id: string}) => {
      return this.stripeService.redirectToCheckout({sessionId: session.id})
    }))
  }


  // To Get the Cached Order Data from the Localstorage
  getCachedOrderData(): Order {
    const jsonString: any = localStorage.getItem('orderData')
    return JSON.parse(jsonString)
  }


  // To Remove the Cached Order Data from the Localstorage
  removeCachedOrderData() {
    localStorage.removeItem('orderData');
  }


}
