import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppMemoriaService } from './../../services/memoria.service';

@Component({
	selector: 'page-add-productos',
	templateUrl: 'addProducto.html'
})
export class AddProductosPage {

	@Input() nombre: string;
	@Input() descripcion: string;
	private codigo: string;
	private imagen: string;

	constructor(
		public navCtrl: NavController, 
		private appMemoriaService: AppMemoriaService, 
		private barcodeScanner: BarcodeScanner,
		private camera: Camera
	) {}

	private goBack () {
		this.navCtrl.pop();
	}

	private loadCodigo () {
		this.barcodeScanner.scan().then((barcodeData) => {
 			// Success! Barcode data is here
 			this.codigo = barcodeData.text;
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
			this.imagen = imageData;
		}, (err) => {
			console.log(err);
		});
	}

	private guardar () {
		this.appMemoriaService.addProducto({
			nombre: this.nombre,
			descripcion: this.descripcion,
			codigo: this.codigo,
			imagen: this.imagen
		})
        .subscribe((producto: Object) => {
            this.goBack();
        }, err => {
            console.log('error', err);
        });
	}

	private validate () {
		if (!this.nombre) {
			return false;
		}
		if (!this.descripcion) {
			return false;
		}
		if (!this.codigo) {
			return false;
		}
		if (!this.imagen) {
			return false;
		}
		return true;
	}

}
