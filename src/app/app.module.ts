import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Topbar2Component } from './public/parts/topbar2/topbar2.component';
import { AllproductComponent } from './pages/products/allproduct.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ProgAnnuelComponent } from './pages/prog-annuel/prog-annuel.component';
import { QrComponent } from './pages/qr/qr.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HistphilComponent } from './pages/histphil/histphil.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { CondventeComponent } from './pages/condvente/condvente.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditprofileService } from './services/editprofile.service';
import { ResponseInterceptor } from './interceptors/response-interceptor.interceptor';
import { TokenInterceptor } from './interceptors/token-interceptor.interceptor';
import { SharedModule } from './shared/shared.module';


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
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: ResponseInterceptor,
  //   multi: true
  // },
    MessageService,
    EditprofileService,],
  bootstrap: [AppComponent],
})
export class AppModule { }
