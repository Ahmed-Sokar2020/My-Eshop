import { UiModule } from '@sokar/ui';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';


const productsRoutes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:id',
    component: ProductsListComponent
  },
  {
    path: 'products/details/:id',
    component: ProductDetailsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    FormsModule,
    UiModule,
    ButtonModule,
    CheckboxModule,
    RatingModule,
    InputNumberModule,
    ToastModule
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ],
  providers:[MessageService]
})
export class ProductsModule {}
