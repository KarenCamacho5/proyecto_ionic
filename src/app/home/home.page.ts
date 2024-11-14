import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular'; 
import { IonHeader, IonToolbar, IonTitle,  IonButton, IonInput, IonLabel, IonItem,  IonContent, } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  providers: [AuthService],
  imports: [IonHeader, IonToolbar, IonTitle,  IonButton, IonInput, IonLabel, IonItem,  IonContent,  CommonModule, FormsModule, HttpClientModule],
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private authService: AuthService, private storage: Storage) {}

  async ngOnInit(): Promise<void> {
    await this.storage['create'](); // Inicializa el almacenamiento
  }

  iniciarSesion(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: async (response) => {
        const token = response.token;
        await this.storage['set']('token', token);
        alert('Has iniciado sesión con éxito');
        this.navCtrl.navigateForward('/main');
      },
      error: (err) => {
        const mensajeError = err.error?.message || 'Correo o contraseña incorrectos';
        alert(`Error en la autenticación: ${mensajeError}`);
      }
    });
  }
}
