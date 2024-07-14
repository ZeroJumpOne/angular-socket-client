import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
   providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate {

   constructor(
      private wsService: WebsocketService,
      private router: Router
   ) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

      if (this.wsService.user) return true;

      return false;
      this.router.navigateByUrl('/login');
   }


}
