import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  accountNotFound= false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword(){
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
        return;
    }
    // this.authservice.forgotPassword(this.forgotPasswordForm.value).subscribe((response:any) => {
    //   this.toasterService.pop('success', 'Vérifier votre courrier', response.message);
    // },
    // (error: any) => {
    //   this.toasterService.pop('error', 'Erreur', error.error.message);
    // });

  }

}
