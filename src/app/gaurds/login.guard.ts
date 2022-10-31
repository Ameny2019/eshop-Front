import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public router: Router,
    private authService: AuthService,
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const isExpired = this.authService.isExpiredToken(token)
      if (!isExpired) {
        this.router.navigate(['/cart-details']);
        return false;
      } else {
        return true;
      }
    }
    return true;
  }


}
