import { ProgAnnuelComponent } from './components/prog-annuel/prog-annuel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductComponent } from './components/products/allproduct.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { QrComponent } from './components/qr/qr.component';
import { AuthGuard } from './gaurds/auth.guard';
import { LoginGuard } from './gaurds/login.guard';
import { ServiceErrorComponent } from './shared/components/Page500/service-error.component';
import { HistphilComponent } from './components/histphil/histphil.component';
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { InvoiceComponent } from "./components/invoice/invoice.component";
import { CondventeComponent } from "./components/condvente/condvente.component";
import { NotFoundErrorComponent } from './shared/components/Page400/not-found-error.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  // { path: '/', redirectTo: 'error404' },
  { path: 'product', component: AllproductComponent },
  { path: 'programme', component: ProgAnnuelComponent },
  { path: 'qr', component: QrComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'histphil', component: HistphilComponent },
  { path: 'categorie', component: CategoriesComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'invoice/:id_cart', component: InvoiceComponent },
  { path: 'ConditionsVente', component: CondventeComponent },
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'auth', canActivate: [LoginGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: '500', component: ServiceErrorComponent },
  { path: '404', component: NotFoundErrorComponent },
  { path: '**', component: NotFoundErrorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
