import { Component, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MemoryService } from './../../services/memory.service';
import { GaleyPage } from './../galery/galery';

@Component({
	selector: 'page-add-product',
	templateUrl: 'addProduct.html'
})
export class AddProductPage {

	@Input() nombre: string;
	@Input() descripcion: string;
	private code: string;
	private image: string;
	private saving = this.loadingCtrl.create({
		content: 'Guardando...'
	});

	constructor(
		public navCtrl: NavController,
		private loadingCtrl: LoadingController,
		private memoryService: MemoryService, 
		private barcodeScanner: BarcodeScanner,
		private camera: Camera
		) {}

	private goBack () {
		this.navCtrl.pop();
	}

	private openGalery () {
		this.navCtrl.push(GaleyPage);
	}

	private loadCode () {
		this.barcodeScanner.scan().then((barcodeData) => {
 			// Success! Barcode data is here
 			this.code = barcodeData.text;
 		}, (err) => {
    		// An error occurred
    	});
	}

	private loadImagen() {

		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			this.image = imageData;
		}, (err) => {
			console.log(err);
		});
	}

	private guardar () {
		/*this.saving.present();
		this.appMemoriaService.addProducto({
			nombre: this.nombre,
			descripcion: this.descripcion,
			codigo: this.codigo,
			imagen: this.imagen
		})
		.subscribe((producto: Object) => {
			this.saving.dismiss();
			this.goBack();
		}, err => {
			console.log('error', err);
		});*/
	}

	private validate () {
		if (!this.nombre) {
			return false;
		}
		if (!this.descripcion) {
			return false;
		}
		if (!this.code) {
			return false;
		}
		if (!this.image) {
			return false;
		}
		return true;
	}

}
