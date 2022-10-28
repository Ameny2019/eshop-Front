import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Topbar1Component } from './components/top-menu/topbar1.component';
import { NotFoundErrorComponent } from './components/Page400/not-found-error.component';
import { FooterComponent } from './components/footer/footer.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ServiceErrorComponent } from './components/Page500/service-error.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
// import { CategoriesComponent } from '../components/home/categories/categories.component';

@NgModule({
  declarations: [
    Topbar1Component,
    NotFoundErrorComponent,
    ServiceErrorComponent,
    FooterComponent,
    SidebarComponent,
    ShoppingCartComponent,
    // CategoriesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    Topbar1Component,
    NotFoundErrorComponent,
    ServiceErrorComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
