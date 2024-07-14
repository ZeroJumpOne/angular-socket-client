import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   public frmLogin: FormGroup = this.fb.group({
      deNombre: ['', Validators.required],
   })

   constructor(
      private fb: FormBuilder,
      private wsService: WebsocketService,
      private router: Router,

   ) {}

   public ingresar() {
      if (this.frmLogin.invalid) return; //No continua
      const { deNombre } = this.frmLogin.value;

      console.log(this.frmLogin.value);
      this.wsService.loginWS( deNombre )
         .then( () => {
            this.router.navigateByUrl('/chat');
         });
   }

}
