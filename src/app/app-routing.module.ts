import { ProgAnnuelComponent } from './pages/prog-annuel/prog-annuel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductComponent } from './pages/products/allproduct.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { QrComponent } from './pages/qr/qr.component';
import { AuthGuard } from './gaurds/auth.guard';
import { LoginGuard } from './gaurds/login.guard';
import { ServiceErrorComponent } from './shared/components/Page500/service-error.component';
import { HistphilComponent } from './pages/histphil/histphil.component';
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { InvoiceComponent } from "./pages/invoice/invoice.component";
import { CondventeComponent } from "./pages/condvente/condvente.component";
import { NotFoundErrorComponent } from './shared/components/Page400/not-found-error.component';

const routes: Routes = [
  // { path: '/', redirectTo: 'error404' },
  { path: 'products', component: AllproductComponent },
  { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
  { path: 'invoice/:id_cart', canActivate: [AuthGuard], component: InvoiceComponent },
  { path: 'programme', component: ProgAnnuelComponent },
  { path: 'qr', component: QrComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'histphil', component: HistphilComponent },
  { path: 'conditions-vente', component: CondventeComponent },
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'auth', /*canActivate: [LoginGuard],*/ loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
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
