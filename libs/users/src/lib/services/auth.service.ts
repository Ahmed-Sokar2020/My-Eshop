import { LocalstorageService } from './localstorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    private router: Router
    ) { }

  // apiURLCategories = environment.apiURL + 'users';
  apiURLUsers = `${environment.apiURL}/users`;

  // Post Method for the Login for User
  Login(email: string, password: string): Observable<User>{
  return this.http.post<User>(`${this.apiURLUsers}/login`, {email, password});
  }


  // Post Method for the registeration for User
  register(email: string, password: string): Observable<User>{
  return this.http.post<User>(`${this.apiURLUsers}/register`, {email, password});
  }


  // To enable User to Logout to the Login Page
  logout() {
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }

}
