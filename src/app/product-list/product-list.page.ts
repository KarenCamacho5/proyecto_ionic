import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, IonicModule } from '@ionic/angular';
import {IonContent,IonHeader, IonTitle,IonToolbar,IonList,IonItem,IonLabel,IonButton,IonButtons,} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
}

type ApiResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: Product[];
};

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule, IonicModule,HttpClientModule,IonButtons,IonButton,IonLabel,IonItem,IonList,IonContent,IonHeader,IonTitle,IonToolbar],
})
export class ProductListPage implements OnInit {
  products: Product[] = [];

  private httpClient = inject(HttpClient);

  constructor(private alertController: AlertController) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  private async loadProducts() {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<ApiResponse>('https://peticiones.online/api/products')
      );

      // Reemplaza HTTP por HTTPS en las URLs de imagen
      this.products = response.results.map((product) => ({
        ...product,
        image: product.image.replace('http://', 'https://'),
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      this.showErrorAlert();
    }
  }

  trackById(index: number, product: Product): string {
    return product._id;
  }
  async detalles(product: Product) {
    alert(` ${product.name}\n\n ${product.description}`);
  }

  
  
  private async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un problema al cargar los productos. Inténtalo nuevamente.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
