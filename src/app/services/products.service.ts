import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/api/products'; // URL del backend

  constructor(private http: HttpClient) {}

 // Método para obtener productos como un Observable
 getProducts(token: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}
}
