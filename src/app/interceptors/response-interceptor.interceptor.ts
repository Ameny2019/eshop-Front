import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private messageService: MessageService,
    // private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Unauthenticated User error
        if (error.status === 401) {
          // reomve localStorage data
          localStorage.removeItem('token');
          this.messageService.add({
            severity: 'info',
            summary: 'La session a été expiré.',
            detail: 'Votre session a été expiré. Merci de refaire le login pour accéder à votre espace.'
          });
          // Save user decoennection
          // this.authService.isLoginSubject.next(false);
          // redirect to the login route
          this.router.navigate(['/auth/login']);
        }
        // Not Found error
        if (error.status === 404) {
          this.router.navigate(['/404']);
        }
        // Server error
        if (error.status === 500) {
          this.router.navigate(['/500']);
        }
        return throwError(error);
      })
    );
  }

}
