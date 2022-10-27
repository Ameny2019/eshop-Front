import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Topbar1Component } from './components/topbar1/topbar1.component';
import { NotFoundErrorComponent } from './components/not-found-error/not-found-error.component';
import { FooterComponent } from './components/footer/footer.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  declarations: [
    Topbar1Component,
    NotFoundErrorComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
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
    FooterComponent,
  ]
})
export class SharedModule { }
