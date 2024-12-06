import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule, HttpClientModule, RouterLink],
})
export class MainPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navToProductList() {
    this.navCtrl.navigateForward('/product-list');
  }
  
  navToreporte() {
    this.navCtrl.navigateForward('/report');
  }

}