import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Topbar1Component } from './components/top-menu/topbar1.component';
import { NotFoundErrorComponent } from './components/Page400/not-found-error.component';
import { FooterComponent } from './components/footer/footer.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ServiceErrorComponent } from './components/Page500/service-error.component';

@NgModule({
  declarations: [
    Topbar1Component,
    NotFoundErrorComponent,
    ServiceErrorComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    Topbar1Component,
    NotFoundErrorComponent,
    ServiceErrorComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
