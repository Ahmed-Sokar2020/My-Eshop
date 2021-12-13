/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})

export class LocalstorageService {

  constructor() { }

  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }


  getToken() {
    return localStorage.getItem(TOKEN);
  }


  removeToken() {
    localStorage.removeItem(TOKEN);
  }


  // Method to be Called in Users Effects File(ngrx)
  IsValidToken() {
     const token = this.getToken();
     if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode)
     } else {
       return false;
     }
  }


  private _tokenExpired(expiration: any | boolean) {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }


// Method to be Called in Users Effects File(ngrx)
  getUserIdFromToken() {
    const token = this.getToken();
     if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return tokenDecode ? tokenDecode.userId : null;
     } else {
      return null;
     }
  }


}


//  export class LocalstorageService {

//   constructor() { }

//   setToken(data: any) {
//     localStorage.setItem(TOKEN, data);
//   }


//   getToken() {
//     return localStorage.getItem(TOKEN);
//   }


//   removeToken() {
//     localStorage.removeItem(TOKEN);
//   }


//   // Method to be Called in Users Effects File(ngrx)
//   IsValidToken(): any {
//      const token = this.getToken();
//      token ? true : false;
//   }

//   // Method to be Called in Users Effects File(ngrx)
//   getUserIdFromToken() {
//     const token = this.getToken();
//      token ? true : null;
//   }




