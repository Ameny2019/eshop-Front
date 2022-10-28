import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    const activationCode = this.route.snapshot.params['code'];
    if (activationCode) {
      this.activateAccount(activationCode);
    }

    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  activateAccount(activationCode){
    this.authService.accountConfirmation(activationCode).subscribe(
      (response: any) => {
        this.messageService.add({ severity: 'success', summary: "Félicitation", detail: response?.message});
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: "Problème!", detail: error?.error?.message});
      });
  }

  login() {
    this.errorLogin = false;
    this.authService.login(this.formLogin.value).subscribe((res: any) => {
      this.authService.setToken(res.token);
      this.authService.setUsername(res.username);
      this.authService.setAvatar(res.avatar);
      this.router.navigate(['/cartDetail']);
      this.messageService.add({ severity: 'success', summary: 'Vous êtes connecté !', detail: res?.message });
    }, (err: any) => {
      this.errorLogin = true;
      this.messageService.add({ severity: 'error', summary: 'Problème de connexion', detail: err?.error?.message });
    });
  }
}
