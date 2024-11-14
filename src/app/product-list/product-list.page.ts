import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ProductsService } from '../services/products.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular'; 
import { NavController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule, IonicStorageModule],
})
export class ProductListPage implements OnInit {

  products: any[] = [];

  constructor(
    private storage: Storage,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const token = await this.storage.get('token'); // Obtén el token almacenado
    if (token) {
      this.productsService.getProducts(token).subscribe({
        next: (data: any) => {
          console.log('Respuesta de la API:', data);
          if (data && Array.isArray(data.results)) {
            this.products = data.results; // Asignar los productos desde la propiedad 'results'
          } else {
            console.error('No se encontraron productos válidos en la respuesta');
          }
        },
        error: (err) => {
          console.error('Error al obtener los productos:', err);
        }
      });
    } else {
      console.error('Token no encontrado');
    }
  }
  trackById(index: number, product: any): string {
    return product._id;
  }
  async detalles(product: any) {
    alert(` ${product.name}\n\n ${product.description}`);
  }
}
