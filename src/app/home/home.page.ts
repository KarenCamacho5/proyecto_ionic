import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular'; 

import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class HomePage implements OnInit {

  email: string = '';
  password: string = '';

  credenciales = [
    ['karencamacho484@gmail.com', '1234'],
    ['f.duran@montechelo.online', '1234'],
    ['andres@gmail.com', '1234'],
  ];

  constructor(private navCtrl: NavController) {}
  ngOnInit(): void {
  }

  iniciarSesion(): void {
    // Verificar credenciales
    const credencialValida = this.credenciales.some(
      ([email, password]) => email === this.email && password === this.password
    );

    if (credencialValida) {
      alert('Has iniciado sesión con éxito');
      this.navCtrl.navigateForward('/main');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }
}
