import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Topbar2Component } from './public/parts/topbar2/topbar2.component';
import { AllproductComponent } from './components/products/allproduct.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ProgAnnuelComponent } from './components/prog-annuel/prog-annuel.component';
import { QrComponent } from './components/qr/qr.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HistphilComponent } from './components/histphil/histphil.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CondventeComponent } from './components/condvente/condvente.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditprofileService } from './services/editprofile.service';
import { ResponseInterceptor } from './interceptors/response-interceptor.interceptor';
import { TokenInterceptor } from './interceptors/token-interceptor.interceptor';
import { SharedModule } from './shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';


@NgModule({
  declarations: [
    AppComponent,
    Topbar2Component,
    AllproductComponent,
    ContactComponent,
    AboutComponent,
    ProgAnnuelComponent,
    QrComponent,
    HistphilComponent,
    CheckoutComponent,
    InvoiceComponent,
    CondventeComponent,
    CategoriesComponent
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
export class AppModule { }
