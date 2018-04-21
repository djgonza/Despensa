// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { AppMemoriaService } from './../../services/memoria.service';

// @Component({
// 	selector: 'page-add-articulo',
// 	templateUrl: 'addArticulo.html'
// })
// export class AddArticulo {

// 	private ubicacion;
// 	private fechaCaducidad;

// 	constructor(
// 		public navCtrl: NavController, 
// 		private appMemoriaService: AppMemoriaService
// 	) {
// 	}

// 	private goBack() {
// 		this.navCtrl.pop();
// 	}

// 	private guardar () {
// 		this.appMemoriaService.addArticulo({
// 			ubicacion: this.ubicacion,
// 			fechaCaducidad: this.fechaCaducidad,
// 			cantidad: 0,
// 			producto: this.appMemoriaService.productoSeleccionado
// 		}).subscribe((articulo) => {
//             this.navCtrl.pop();
//         }, err => {
//             console.log('error', err);
//         });;
// 	}

// 	private validate () {
// 		if (!this.ubicacion) {
// 			return false
// 		}
// 		if (!this.fechaCaducidad) {
// 			return false
// 		}
// 		return true;
// 	}

// }