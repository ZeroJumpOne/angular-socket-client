import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-chat',
   templateUrl: './chat.component.html',
   styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

   public frmChat: FormGroup = this.fb.group({
      deMsj: ['', Validators.required],
   });

   private chatSubscription?: Subscription;
   public mensajes: any[] = [];
   public elemento: HTMLElement | undefined | null;

   constructor(
      private fb: FormBuilder,
      private chatService: ChatService,
   ) { }

   ngOnInit(): void {

      this.elemento = document.getElementById('chats');
      console.log(this.elemento);


      this.chatSubscription = this.chatService.getMessage().subscribe( (msj) => {
         console.log(msj);

         this.mensajes.push(msj);

         setTimeout(() => {
            this.elemento!.scrollTop = this.elemento!.scrollHeight;
         }, 50);
      });
   }

   ngOnDestroy(): void {
      this.chatSubscription?.unsubscribe();
   }

   public onEnviar() {
      if (this.frmChat.invalid) return; //si no hay datos no continua
      const { deMsj } = this.frmChat.value;
      // console.log(deMsj);
      this.chatService.sendMessage(deMsj);

      this.frmChat.reset({ deMsj: '' });
   }

}
