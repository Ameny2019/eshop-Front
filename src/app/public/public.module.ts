import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CartDetailComponent } from './components/cart-details/cart-detail.component';
import { DetailComponent } from './components/product-details/detail.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BannerComponent } from './parts/banner/banner.component';
import { FeaturedComponent } from './parts/featured/featured.component';
import { SubscribeComponent } from './parts/subscribe/subscribe.component';
import { EfleureComponent } from './parts/efleure/efleure.component';
import { OfferComponent } from './parts/offer/offer.component';
import { CategoriesComponent } from './parts/estamps/estamps.component';


@NgModule({
  declarations: [
    CartDetailComponent,
    DetailComponent,
    HomeComponent,
    LayoutComponent,
    BannerComponent,
    FeaturedComponent,
    SubscribeComponent,
    EfleureComponent,
    OfferComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
  ]
})
export class PublicModule { }
