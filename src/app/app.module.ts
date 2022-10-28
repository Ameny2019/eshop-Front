import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { Topbar2Component } from './components/home/topbar2/topbar2.component';
import { SidebarComponent } from './components/home/sidebar/sidebar.component';
import { FeaturedComponent } from './components/home/featured/featured.component';
import { CategoriesComponent } from './components/home/estamps/estamps.component';
import { OfferComponent } from './components/home/offer/offer.component';
import { SubscribeComponent } from './components/home/subscribe/subscribe.component';
import { AllproductComponent } from './components/products/allproduct/allproduct.component';
import { DetailComponent } from './components/products/detail/detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ProgAnnuelComponent } from './components/prog-annuel/prog-annuel.component';
import { QrComponent } from './components/qr/qr.component';
import { EfleureComponent } from './components/home/efleure/efleure.component';

import { LayoutComponent } from './components/layout/layout.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BannerComponent } from './components/home/banner/banner.component';
import { ServiceErrorComponent } from './service-error/service-error.component';
import { HistphilComponent } from './components/histphil/histphil.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CondventeComponent } from './components/condvente/condvente.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditprofileService } from './services/editprofile.service';
import { ResponseInterceptor } from './interceptors/response-interceptor.interceptor';
import { TokenInterceptor } from './interceptors/token-interceptor.interceptor';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Topbar2Component,
    SidebarComponent,

    FeaturedComponent,
    CategoriesComponent,
    OfferComponent,
    SubscribeComponent,
    AllproductComponent,
    DetailComponent,
    ContactComponent,
    AboutComponent,
    ProgAnnuelComponent,
    QrComponent,
    EfleureComponent,

    LayoutComponent,
    CartDetailComponent,
    BannerComponent,
    ServiceErrorComponent,
    HistphilComponent,
    CheckoutComponent,
    InvoiceComponent,
    CondventeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgSelectModule,
    ToastModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
   },
   {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true
   },
   MessageService,
   EditprofileService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
