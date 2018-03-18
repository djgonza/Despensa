import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { AppMemoriaService } from './../../services/memoria.service';
import { ModalArticulos } from './../modalArticulos/modalArticulos';

@Component({
	selector: 'page-productos',
	templateUrl: 'productos.html'
})
export class ProductosPage implements OnInit {

	constructor(
		public navCtrl: NavController, 
		private appMemoriaService: AppMemoriaService,
		public modalCtrl: ModalController
		) {

	}

	ngOnInit() { 
		this.appMemoriaService.loadProductos();
	}

	private showModalArticulos (producto: object) {
		let modal = this.modalCtrl.create(ModalArticulos, producto);
    	modal.present();
	}

	private refrescar () {
		this.appMemoriaService.loadProductos();
	}

}



