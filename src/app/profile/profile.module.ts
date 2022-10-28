import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/editprofile/editprofile.component';
import { InternationalPhoneNumberModule } from 'ng-phone-number';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    InternationalPhoneNumberModule,
  ]
})
export class ProfileModule { }
