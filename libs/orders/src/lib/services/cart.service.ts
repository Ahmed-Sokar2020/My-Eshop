import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    // If There is a Cart in LocalStorage
    const cart: Cart = this.getCart();
    // If There is not a Cart
    if(!cart) {
      const initialCart = {
        items: []
      };
      // To Convert JS Object To JSON String to Set Item in LocalStorage
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJson);
    }
  }

  emptyCart() {
    const initialCart = {items: []};
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJson);
    this.cart$.next(initialCart);
  }

  getCart(): Cart {
    const cartJsonString: any = localStorage.getItem(CART_KEY);
    // To Convert JSON String To JS Object  to Get Item From LocalStorage
    const cart: Cart = JSON.parse(cartJsonString);
    return cart
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    // To Increase Only Quantity Not Product Id
    const cartItemExist = cart.items?.find(
      (item) => item.productId === cartItem.productId)

    if(cartItemExist) {
      cart.items?.map(item => {
        if(item.productId === cartItem.productId) {
          // Update Cart Quantity when User in the Cart Page
          if(updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
          // return item
        }
      })
    } else {
      cart.items?.push(cartItem);
    }
    // Then Send Again the Cart to LocalStorage to Set Item
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    // To Update The State Of The Cart
    this.cart$.next(cart);
    return cart;
  }

  //  To Delete CartItem from Cart Page
  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart =
    cart.items?.filter(item => item.productId !== productId)

    cart.items = newCart;

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart)
  }

}
