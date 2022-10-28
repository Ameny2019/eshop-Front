
import { ProgAnnuelComponent } from './components/prog-annuel/prog-annuel.component';
import { HomeComponent } from './components/home/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductComponent } from './components/products/allproduct/allproduct.component';
import { DetailComponent } from './components/products/detail/detail.component'
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { QrComponent } from './components/qr/qr.component';
import { AuthGuard } from './gaurds/auth.guard';
import { LoginGuard } from './gaurds/login.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { ServiceErrorComponent } from './service-error/service-error.component';
import { HistphilComponent } from './components/histphil/histphil.component';
import { CategoriesComponent } from './components/home/categories/categories.component'
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { InvoiceComponent } from "./components/invoice/invoice.component";
import { CondventeComponent } from "./components/condvente/condvente.component";

const routes: Routes = [
  // { path: '/', redirectTo: 'error404' },

  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LayoutComponent },
      { path: 'detail', component: DetailComponent },
      { path: 'cartDetail', component: CartDetailComponent },



    ],
  },
  { path: 'product', component: AllproductComponent },
  { path: 'programme', component: ProgAnnuelComponent },
  { path: 'qr', component: QrComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'error404', component: NotFoundErrorComponent },
  { path: 'error500', component: ServiceErrorComponent },
  { path: 'histphil', component: HistphilComponent },
  { path: 'categorie', component: CategoriesComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'invoice/:id_cart', component: InvoiceComponent },
  { path: 'ConditionsVente', component: CondventeComponent },
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'auth', canActivate: [LoginGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  // { path: '**', component: NotFoundErrorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
