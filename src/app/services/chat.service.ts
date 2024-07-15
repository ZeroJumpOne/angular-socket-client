import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
   providedIn: 'root'
})
export class ChatService {

   constructor(public wsService: WebsocketService) { }

   public sendMessage( msj: string ) {

      const payload = {
         de: this.wsService.user?.nombre,
         cuerpo: msj,
      }

      this.wsService.emit('chat', payload);
   }

   public getMessage() {
      return this.wsService.listen('chat-new');
   }

   public getMessagePrivate() {
      return this.wsService.listen('chat-private');
   }

   public getUsuariosActivos() {
      return this.wsService.listen('usuarios-activos');
   }

   public emitirUsuariosActivos() {
      this.wsService.emit('obtener-usuarios')

   }
}
