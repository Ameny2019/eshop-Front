import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EditprofileService } from 'src/app/services/editprofile.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    public editprofileService: EditprofileService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  editProfile = new FormGroup({
    nom: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl(''),
    tel: new FormControl(''),
  });


  ngOnInit(): void {
    this.editprofileService
      .getProfile()
      .subscribe((result: any) => {
        this.editProfile.patchValue(result.data);
      });
  }

  updateData() {
    this.editprofileService
    .editProfile( this.editProfile.value)
    .subscribe((response:any) => {
      this.messageService.add({ severity: 'success', summary: 'Modification Profil', detail: 'Votre profil a bien été modifié avec succés !!' });
      this.router.navigate(['/profile']);
    }, (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Problème de connexion', detail: err?.error?.message });
    });

  }
}
