import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as fromApp from '../../state/app.state'
import { getCurrentUser } from '../../authentication/store/index';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { RedireccionarPerfilService } from '../services/redireccionar-perfil.service';

@Injectable({
  providedIn: 'root'
})
export class NegateauthGuard implements CanActivate {

  constructor( 
    private store: Store<fromApp.State>, 
    private router: Router, 
    private redirectorService: RedireccionarPerfilService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.pipe(select(getCurrentUser)).pipe(map((user) => {

        
        if (!user) {
            return true
        } else {//verificamos si tiene mas de un rol
          if(user.Roles.length > 1){
            return this.router.createUrlTree(['/seleccion-perfil']);
          }else{
            return this.router.createUrlTree([this.redirectorService.redirect(user.Roles[0])]);
          }
        }
    }))
  }
  
}
