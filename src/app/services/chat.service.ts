import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
   providedIn: 'root'
})
export class ChatService {

   constructor(public wsService: WebsocketService) { }

   public sendMessage( msj: string ) {

      const payload = {
         de: 'Hdez',
         cuerpo: msj,
      }

      this.wsService.emit('chat', payload);
   }

   public getMessage() {
      return this.wsService.listen('chat-new');
   }
}
