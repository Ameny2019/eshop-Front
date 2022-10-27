import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  tokenAlreadyUsedError = false;
  submitted = false;
  token: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required, Validators.minLength(8)],
      passwordconfirm: ['', Validators.required, Validators.minLength(8), RxwebValidators.compare({fieldName:'password' })],
    });
  }

  resetPassword(){
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return
    };
    // this.authservice.resetPassword(this.resetPasswordForm.value).subscribe((response: any) => {
    //   this.toasterService.pop('success', 'Félicitations', response.message);
    //   this.router.navigate(['/login']);
    // },
    //   (error: any) => {
    //     this.toasterService.pop('error', 'Erreur', error.error.message);
    //   }
    // );
  }

}
