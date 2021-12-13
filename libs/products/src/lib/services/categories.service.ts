import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // apiURLCategories = 'http://localhost:3000/api/v1/categories';
  apiURLCategories = `${environment.apiURL}/categories`;

  constructor(private http: HttpClient) { }

  // Get Method for the list of Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories);
  }

  // Get Method for Updating any Category in Category Form Page
  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  }

  // Put Method for updating any Category in Category Form Page
  updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.apiURLCategories}/${category.id}` , category);
  }

  // Post Method for the created Category
  CreateCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(`${this.apiURLCategories}`, category);
  }

  // Delete Method for Deleting any Category in Categories List
  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`);
  }

}



