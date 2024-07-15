import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class WebsocketService {

   public socketStatus: boolean = false;
   private usuario: Usuario | null = null;

   constructor(
      private socket: Socket,
      private router: Router,
   ) {
      this.cargarStorage();
      this.checkStatus();
   }

   public get user() {
      return this.usuario;
   }

   private checkStatus() {

      this.socket.on('connect', () => {
         console.log('Conectado al servidor');
         this.socketStatus = true;
         this.cargarStorage();
      });

      this.socket.on('disconnect', () => {
         console.log('Desconectado del servidor');

         this.socketStatus = false;
      });
   }

   public emit(evento: string, payload?: any, callback?: Function) {
      console.log('Emitiendo', evento);

      this.socket.emit(evento, payload, callback);
   }

   public listen(evento: string): Observable<any> {
      return this.socket.fromEvent(evento);

   }

   public loginWS(nombre: string) {

      return new Promise((resolve, reject) => {
         this.emit('configurar-usuario', { nombre: nombre }, (rsp: any) => {

            this.usuario = new Usuario(nombre);
            this.guardarStorage();
            resolve('exito');
         });
      })
   }

   public logoutWS() {

      this.usuario = null;
      localStorage.removeItem('usuario');

      const payload = {
         nombre: 'sin-nombre'
      };
      this.emit('configurar-usuario', payload, () => {});

      this.router.navigateByUrl('/login');
   }

   public guardarStorage() {
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
   }

   public cargarStorage() {
      if ( localStorage.getItem('usuario')) {
         this.usuario = JSON.parse( localStorage.getItem('usuario')! );

         if (this.usuario) {
            this.loginWS( this.usuario.nombre);
         }
      }

   }




}
