import { Component } from '@angular/core';
import { ModalController, ViewController, NavParams } from 'ionic-angular';
import { AppMemoriaService } from './../../services/memoria.service';
import { AddArticulo } from './../addArticulo/addArticulo';

@Component({
	selector: 'articulos-page',
	templateUrl: 'articulos.html'
})
export class ArticulosPage {

	private producto: object;
	private articulos: object[];

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

	private updateCantidad (articulo, cantidad) {
		this.appMemoriaService.updateArticuloCantidad(articulo['_id'], cantidad)
		.subscribe((res) => {
			console.log("res", res);
			this.articulos.find((articulo) => {
				return articulo['_id'] == res['_id'];
			})['cantidad'] = res['cantidad'];
		}, (err) => {
			console.log(err);
		})
	}

}