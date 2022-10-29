import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EditProfileService } from 'src/app/services/editprofile.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public name: string;
  public role: string;
  public email: string;
  public adresse: string;
  public id: string;
  public tel: Number;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private editprofileService: EditProfileService,
    public authService: AuthService) {
    this.profileForm = this.formBuilder.group({
      addresse: ['', Validators.required],
      client: ['', Validators.required],
      email: ['', Validators.required],
      nom: ['', Validators.required],
      password: ['', Validators.required],
      tel: [''],
    });
  }

  ngOnInit(): void {
    this.editprofileService
    .getProfile()
    .subscribe((result: any) => {
      this.name = result.data.nom;
      this.role = result.data.role;
      this.email = result.data.email;
      this.adresse = result.data.adresse;
      this.id = result.data._id;
      this.tel = result.data.tel;
      const data = {
        nom : result.data.nom,
        email : result.data.email,
      }
      this.profileForm.patchValue(data);
    });
  }

}









