import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EditprofileService } from 'src/app/services/editprofile.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditProfileComponent implements OnInit {
  currentFile: File;
  editProfile = new FormGroup({
    nom: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl(''),
    tel: new FormControl(''),
  });

  constructor(
    public editprofileService: EditprofileService,
    public authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.editprofileService
      .getProfile()
      .subscribe((response: any) => {
        this.editProfile.patchValue(response.data);
      });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.currentFile = file;
    }
  }

  updateData() {
    const userForm = this.editProfile.value;
    let formData: any = new FormData();
    Object.keys(userForm).forEach((fieldName) => {
      formData.append(fieldName, userForm[fieldName]);
    });
    if (this.currentFile) {
      formData.append("image", this.currentFile, this.currentFile.name);
    }

    this.editprofileService
    .editProfile(formData)
    .subscribe((response:any) => {
      // save username & avatar
      this.authService.usernameSubject.next(response?.username);
      this.authService.avatarSubject.next(response?.avatar);
      // show messsage
      this.messageService.add({ severity: 'success', summary: 'Modification Profil', detail: 'Votre profil a bien été modifié avec succés !!' });
      this.router.navigate(['/profile']);
    }, (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Problème de connexion', detail: err?.error?.message });
    });

  }
}
