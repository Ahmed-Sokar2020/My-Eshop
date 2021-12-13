import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Stripe Library for Payments
import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { MessagesComponent } from './shared/messages/messages.component';

// Libs Modules
import { ProductsModule } from '@sokar/products';
import { UiModule } from '@sokar/ui';
import { UsersModule } from '@sokar/users';
import { OrdersModule } from '@sokar/orders';

import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';

// NgRx Modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JwtInterceptor } from '@sokar/users';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot('pk_test_51JvY8wLZ7eZ4G7GfNsBSMH2qhZcgi8wL0lVF5iC4efI2584pCTqhdSx8NOXGc7JvZWBqQcNruRy9vsE7w4hO2CYG00gpiZ6bUU'),
    AccordionModule,
    ToastModule,
    ProductsModule,
    UiModule,
    OrdersModule,
    UsersModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
