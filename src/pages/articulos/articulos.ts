import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { AppMemoriaService } from './../../services/memoria.service';
import { AddArticulo } from './../addArticulo/addArticulo';

@Component({
	selector: 'articulos-page',
	templateUrl: 'articulos.html'
})
export class ArticulosPage {

	private producto: object;
	private articulos: object;

	constructor(
		public viewCtrl: ViewController,
		public params: NavParams,
		public modalCtrl: ModalController,
		private appMemoriaService: AppMemoriaService
	) {
		this.articulos = this.params.get('articulos')
		this.producto = this.params.data;
	}

	private dismiss() {
		this.viewCtrl.dismiss();
	}

	private showModalAddArticulos () {
		let modal = this.modalCtrl.create(AddArticulo, this.producto);
    	modal.present();
	}

}