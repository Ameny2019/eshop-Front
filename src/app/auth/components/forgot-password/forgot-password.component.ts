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
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((res:any) => {
      this.messageService.add({ severity: 'success', summary: 'Vérifier votre courrier', detail: res?.message });
    },
    (err: any) => {
     this.accountNotFound = true;
      this.messageService.add({ severity: 'error', summary: 'Problème!', detail: err?.error?.message });
    });
  }

}
