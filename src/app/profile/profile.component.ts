import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EditprofileService } from '../services/editprofile.service';

import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {



  public profileForm: FormGroup;
  public name: string;
  public role:string; 
  public email:string; 
  public adresse:string; 
  public id:string;
  public tel:Number;

  editForm:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,public editprofileService:EditprofileService ) {
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
    let data = localStorage.getItem('user');
    let user = JSON.parse(data);
    if (user) {
      this.profileForm.controls['client'].setValue(user.nom);
      this.profileForm.controls['email'].setValue(user.email);
      this.name=user.nom ; 
      this.role = user.role ; 
      this.email = user.email ; 
      this.adresse = user.adresse ; 
      this.id = user._id ;
      this.tel = user.tel ;
      //this.profileForm.controls['addresse'].setValue(user.addresse);
    }


  }

  
   
  }









