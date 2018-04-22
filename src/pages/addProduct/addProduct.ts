import { Component, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Observable } from "rxjs/Observable";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MemoryService } from './../../services/memory.service';
import { Galery } from './../../components/galery/galery';
import { ProductService } from './../../services/product.service';


@Component({
	selector: 'page-add-product',
	templateUrl: 'addProduct.html'
})
export class AddProductPage {

	@Input() name: string;
	@Input() descripcion: string;
	private code: string;
	private image: object;
	private selectingImage: boolean = false;
	private loader;

	constructor(
		public navCtrl: NavController,
		private loadingController: LoadingController,
		private memoryService: MemoryService, 
		private barcodeScanner: BarcodeScanner,
		private camera: Camera,
		private productService: ProductService
		) {}

	private goBack () {
		this.navCtrl.pop();
	}

	private openLoader () {
		this.loader = this.loadingController.create({
			content: '<div class="loader-subiendo-imagen">Guardando</div>'
		});
		this.loader.present();
	}

	private closeLoader () {
		this.loader.dismiss();
		this.loader = null;
	}

	private addImage (image: object) {
		this.image = image;
		this.selectingImage = false;
	}

	private openGalery () {
		this.selectingImage = true;
	}

	private loadCode () {
		this.barcodeScanner.scan().then((barcodeData) => {
 			// Success! Barcode data is here
 			this.code = barcodeData.text;
 		}, (err) => {
    		// An error occurred
    	});
	}

	private guardar () {

		this.openLoader ();

		console.log(this.image);

		var product = {
			name: this.name,
			image: this.image['_id'],
			code: this.code
		}
		this.productService.addProduct(product)
		.subscribe(res => {
			this.closeLoader ();
			this.goBack ();
		}, err => {
			this.closeLoader ();
		});

	}

	private validate () {
		if (!this.name) {
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
