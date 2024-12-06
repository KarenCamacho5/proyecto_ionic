import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'https://proyectoionic.onrender.com/api'; // URL del backend

  constructor( private http: HttpClient) { }

  downloadPDF(token: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reporte-pdf`, { 
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'blob',
    });
  }

  downloadExcel(token: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reporte/excel`, { 
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      responseType: 'blob',
    });
  }
}
