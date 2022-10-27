import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,) { }

  ngOnInit() {
    this.registeForm = this.formBuilder.group({
      "nom": new FormControl('', Validators.required),
      "email": new FormControl('', (Validators.required, Validators.email)),
      "password": new FormControl('', (Validators.required, Validators.minLength(8))),
      "passwordconfirm": new FormControl('', (Validators.required, Validators.minLength(8), RxwebValidators.compare({ fieldName: 'password' })))
    })
  }

  register() {
    this.authService.register(this.registeForm.value).subscribe(
      (res: any) => {
        this.messageService.add({severity:'success', summary:'Bienvenue!', detail: res?.message});
        this.router.navigateByUrl('/auth/login');
      }, (err:any) => {
        this.messageService.add({severity:'error', summary:'Problème!', detail: err?.error.message});
      }
    );
  }

}
