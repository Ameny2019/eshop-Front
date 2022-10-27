import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EditprofileService } from '../../services/editprofile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  constructor(
    public editprofileService: EditprofileService,
    private router: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  editProfile = new FormGroup({
    nom: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl(''),
    tel: new FormControl(''),
  });
 

  ngOnInit(): void {
 
    this.editprofileService
      .GetUserById(this.router.snapshot.params['id'])
      .subscribe((result: any) => {
        console.log('res', result.data);
        this.editProfile = new FormGroup({
          nom: new FormControl(result.data['nom']),
          email: new FormControl(result.data['email']),
          adresse: new FormControl(result.data['adresse']),
          tel: new FormControl(result.data['tel']),
          
        });
      });
  }

  UpdateData() {

    
    this.editprofileService.editProfile(this.router.snapshot.params['id'],this.editProfile.value).subscribe((result)=> {
    
      
      
    })

    console.log(this.editProfile.value)
    // this.editProfile.value.push(this.router.snapshot.params['id']);

    let newObjtoStore = {...this.editProfile.value,...{"_id":this.router.snapshot.params['id']}}

    console.log("pushp",newObjtoStore)
    localStorage.setItem('user', JSON.stringify(newObjtoStore));

    this.messageService.add({severity:'success', summary:'Modification Profil', detail:'Votre profil a bien été modifié avec succés !!'});

   
  }
}
