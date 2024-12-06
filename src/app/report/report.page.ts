import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReportService } from '../services/report.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { saveAs } from 'file-saver'; 

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [IonicModule, IonicStorageModule],
})
export class ReportPage {
  constructor(private reportService: ReportService, private storage: Storage,) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create(); // Inicializa el almacenamiento
  }

  async downloadPDF() {
    const token = await this.storage.get('token');  // Obtén el token almacenado

    if (token) {
      this.reportService.downloadPDF(token).subscribe(
        (response: Blob) => {
          this.savePDFFile(response);
        },
        (error) => {
          console.error('Error al descargar el PDF', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  savePDFFile(blob: Blob) {
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = 'reporte.pdf';  // Nombre del archivo descargado
    link.click();
    window.URL.revokeObjectURL(url);  // Libera el objeto URL
  }

  async downloadExcel() {
    const token = await this.storage.get('token');  // Obtén el token almacenado

    if (token) {
      this.reportService.downloadExcel(token).subscribe(
        (response: Blob) => {
          this.saveExcelFile(response);
        },
        (error) => {
          console.error('Error al descargar el Excel', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  saveExcelFile(blob: Blob) {
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = 'productos.xlsx';  
    link.click();
    window.URL.revokeObjectURL(url);  
  }
}

