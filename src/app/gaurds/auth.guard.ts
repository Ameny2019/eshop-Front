import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const isexpired = this.authService.isExpiredToken(token)
      if (!isexpired) {
        return true
      } else {
        this.messageService.add({
          severity: 'info',
          summary: 'La session a été expiré.',
          detail: 'Votre session a été expiré. Merci de refaire le login pour accéder à votre espace.'
        });
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
