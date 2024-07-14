import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuardService } from './guards/usuario-guard.service';

const routes: Routes = [
   {
      path: '',
      component: LoginComponent,
   },
   {
      path: 'chat',
      component: MensajesComponent,
      canActivate: [ UsuarioGuardService ],
   },
   {
      path: '**',
      redirectTo: ''
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
