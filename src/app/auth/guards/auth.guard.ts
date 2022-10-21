import { tap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.auth.id) {
    //   return true
    // }else{
    //   console.log("¿A donde vas? - CanActivate")
    //   return false;

    // }
    return this.authService.verificaion().pipe(
      tap((autenticado) => {
        if (!autenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    // console.log('canLoad', true);
    // console.log(route);
    // console.log(segments);

    return this.authService.verificaion().pipe(
      tap((autenticado) => {
        if (!autenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );

    // if (this.authService.auth.id) {
    //   return true
    // }else{
    //   console.log("¿A donde vas? - CanLoad")
    //   return false;

    // }
  }
}
