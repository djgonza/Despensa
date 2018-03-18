import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { AppMemoriaService } from './../../services/memoria.service';
import { AddProductosPage } from './../addProducto/addProducto';
import { ArticulosPage } from './../articulos/articulos';
import Config from './../../config';

@Component({
	selector: 'page-productos',
	templateUrl: 'productos.html'
})
export class ProductosPage implements OnInit {

	private config: object;

	constructor(
		public navCtrl: NavController, 
		private appMemoriaService: AppMemoriaService,
		public modalCtrl: ModalController
	) {

	}

	ngOnInit() { 
		this.config = Config;
		this.appMemoriaService.loadAllProductos();
	}

	private showModalArticulos (producto: object) {
		let modal = this.modalCtrl.create(ArticulosPage, producto);
    	modal.present();
	}

	private addProducto () {
		let modal = this.modalCtrl.create(AddProductosPage);
    	modal.present();
	}

}



