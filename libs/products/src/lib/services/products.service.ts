import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // apiURLProducts = 'http://localhost:3000/api/v1/products';
  apiURLProducts = `${environment.apiURL}/products`;

  constructor(private http: HttpClient) { }

  // Get Method for the list of Products
  getProducts(filteredCategories?: string[]): Observable<Product[]> {
    let myParams = new HttpParams();
    if(filteredCategories) {
      myParams = myParams.append('categories', filteredCategories.join(','));
    }
    return this.http.get<Product[]>(this.apiURLProducts, {params: myParams});
  }

  // Get Method for one Product for Updating(Editing)
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  //  Post Method for the created Product
  createProduct(formData: FormData): Observable<Product>{
    return this.http.post<Product>(this.apiURLProducts, formData);
  }

  //  Put Method for updating any Product
  updateProduct(formData: FormData, productId: string): Observable<Product>{
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}` , formData);
  }

  //  Put Method for updating any Product Gallery
  updateProductGallery(formData: FormData, productId: string): Observable<Product>{
    return this.http.put<Product>(`${this.apiURLProducts}/gallery-images/${productId}` , formData);
  }

  // Delete Method for Deleting any Product
  deleteProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiURLProducts}/${productId}`);
  }

  // Get The Count Of Products to Show in Dashboard Page
  getProductsCount(): Observable<{productCount: number}> {
    return this.http
      .get<{productCount: number}>(`${this.apiURLProducts}/get/count`)
      .pipe();
  }


  // Get The Featured Products to Show in Home Page in Ecommerce
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/:count`)
  }

}



