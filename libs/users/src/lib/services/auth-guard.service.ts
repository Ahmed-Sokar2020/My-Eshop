/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private localstorageService: LocalstorageService,
    private router: Router) { }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localstorageService.getToken();
    // Case if the User have Token
    if(token) {
      // atob() Method to Split the Token
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
      return true;
      }
    }

    // Case if the User not have Token
    this.router.navigate(['/login']);
    return false;
  }

  // Method Expiration of the Token
  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

}













// export class AuthGuard implements CanActivate {

//   constructor(
//     private localstorageService: LocalstorageService,
//     private router: Router) { }
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const token = this.localstorageService.getToken();
//     // Case if the User have Token
//     if(token) return true;

//     // Case if the User not have Token
//     this.router.navigate(['/login']);
//     return false;
//   }
// }



