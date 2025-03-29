// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UseraccountsService } from '../services/useraccounts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  router = inject(Router);
  authService = inject(UseraccountsService);

  canActivate() {
    return this.authService.isLoggedIn();
  }
    
}