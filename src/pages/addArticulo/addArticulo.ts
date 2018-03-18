import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { AppMemoriaService } from './../../services/memoria.service';

@Component({
	selector: 'modal-add_articulo',
	templateUrl: 'addArticulo.html'
})
export class AddArticulo {

	private ubicacion;
	private fechaCaducidad;
	private producto;

	constructor(
		public viewCtrl: ViewController,
		public params: NavParams,
		private appMemoriaService: AppMemoriaService
	) {
		this.producto = this.params.get('_id')
		console.log('producto', this.producto);
	}

	private dismiss() {
		this.viewCtrl.dismiss();
	}

	private guardar () {
		this.appMemoriaService.addArticulo({
			producto: this.producto,
			ubicacion: this.ubicacion,
			fechaCaducidad: this.fechaCaducidad
		}).subscribe((articulo) => {
            this.dismiss();
        }, err => {
            console.log('error', err);
        });;
	}

	private validate () {
		if (!this.ubicacion) {
			return false
		}
		if (!this.fechaCaducidad) {
			return false
		}
		return true;
	}

}