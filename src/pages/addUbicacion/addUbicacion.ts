import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AppMemoriaService } from './../../services/memoria.service';

@Component({
	selector: 'page-add-ubicacion',
	templateUrl: 'addUbicacion.html'
})
export class AddUbicacion {

	private ubicacion;
	private toast;

	constructor(
		public navCtrl: NavController, 
		private appMemoriaService: AppMemoriaService,
		private toastCtrl: ToastController
		) {
	}

	ngOnInit() { 
	}

	private guardar () {
		this.appMemoriaService.addUbicacion({
			nombre: this.ubicacion
		}).subscribe((ubicacion) => {
			this.showToast(`Ubicacion ${ubicacion['nombre']} guardada correctamente.`);
			this.limpiar();
		}, err => {
			console.log('error', err);
		});;
	}

	private validate () {
		if (!this.ubicacion) {
			return false
		}
		return true;
	}

	private limpiar () {
		this.ubicacion = "";
	}

	private showToast (message) {
		this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'button'
		}).present();
	}

}