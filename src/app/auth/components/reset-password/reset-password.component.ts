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
    this.resetPasswordForm = this.formBuilder.group({
      token: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordconfirm: ['', [Validators.required, Validators.minLength(8), RxwebValidators.compare({ fieldName: 'password' })]],
    });
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.resetPasswordForm.patchValue({token: this.token});
    });
  }

  resetPassword() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return
    };
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Félicitations', detail: res?.message });
      this.router.navigate(['/auth/login']);
    },
      (err: any) => {
        this.tokenAlreadyUsedError = true;
        this.messageService.add({ severity: 'error', summary: 'Problème!', detail: err?.error?.message });
      }
    );
  }

}
