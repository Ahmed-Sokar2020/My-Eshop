/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '../state/users.facade';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 // apiURLUsers = 'http://localhost:3000/api/v1/users';
 apiURLUsers = `${environment.apiURL}/users`;

 constructor(
   private http: HttpClient,
   private usersFacade: UsersFacade) {
  countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
  }


 // Get Method for the list of Categories
 getUsers(): Observable<User[]> {
   return this.http.get<User[]>(this.apiURLUsers);
 }


 // Get Method for one User for Updating(Editing)
 getUser(userId: string): Observable<User> {
   return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
 }


 //  Post Method for the created User
 createUser(user: User): Observable<User>{
   return this.http.post<User>(`${this.apiURLUsers}/add-user`, user);
 }


 //  Put Method for updating any User
 updateUser(user: User): Observable<User>{
   return this.http.put<User>(`${this.apiURLUsers}/${user.id}` , user);
 }


 // Delete Method for Deleting any User
 deleteUser(userId: string): Observable<User> {
   return this.http.delete<User>(`${this.apiURLUsers}/${userId}`);
 }


// To get Countries in Dropdown List in Users-form Page
 getCountries(): {id: string, name: string}[] {
  return Object.entries(countriesLib.getNames('en', {select: 'official'})).map(entry => {
    return {
      id: entry[0],
      name: entry[1]
    }
  })
 }


// To get Country in the Table in Users-list Page
 getCountry(countryKey: string): string {
  return countriesLib.getName(countryKey, 'en')
 }


getUsersCount(): Observable<{userCount: number}> {
    return this.http
      .get<{userCount: number}>(`${this.apiURLUsers}/get/count`)
      .pipe();
  }


//  Method To be Called in The APP Component(Entery Point of Application)
 initAppSession() {
  this.usersFacade.buildUserSession();
 }


// Method To Retrun the Selectors Which are Called in The Effects File
 observeCurrentUser() {
  return this.usersFacade.currentUser$;
 }


 observeIsAuthenticated() {
  return this.usersFacade.isAuthenticated$;
 }

}
