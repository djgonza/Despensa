import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { map } from 'rxjs/operators';

import * as Constants from './../../../models/constants';
import { Product } from './../../../models/product';
import { Image } from './../../../models/image';
import { Galery } from './../../../components/galery/galery';

import { MemoryService } from './../../../services/memory.service';
import { HttpService } from '../../../services/http.service';
import { ImageService } from '../../../services/image.services';
import { LoaderService } from '../../../services/loader.service';

@Component({
	selector: 'new-product-component',
	templateUrl: 'new.product.component.html'
})
export class NewProductComponent implements OnInit {

	private name: string;
	private code: string;
	private image: object;
	@Output() close = new EventEmitter<boolean>();
	@Output() openGalery = new EventEmitter<boolean>();

	constructor(
		private barcodeScanner: BarcodeScanner,
		private memory: MemoryService,
		private imageService: ImageService,
		private http: HttpService,
		private loader: LoaderService,
		public modalCtrl: ModalController
		) {}

	ngOnInit() { 
	
	}

	private selectImage () {
		this.openGalery.emit(true);
	}

	private getImage (): Observable<any> {
		return this.memory.getSelect(Constants.IMAGE)
		.pipe(
			map((image: Image)=> {
				if (image) return image.location;
				return 'http://via.placeholder.com/1000x1000';	
			})
		);
	}

	private loadCode () {
		this.barcodeScanner.scan().then((barcodeData) => {
			this.code = barcodeData.text;
		}, (err) => {

		});
	}

	private getSelectedCategory () {
		return this.memory.getSelectedValue(Constants.CATEGORY);
	}

	private getSelectedImage () {
		var img = this.memory.getSelectedValue(Constants.IMAGE);
		return img ? img._id : null;
	}

	private create () {
		this.loader.addMessage("Creando producto");
		var newProduct = new Product(this.name, this.code, this.getSelectedCategory(), null, this.getSelectedImage());
		this.http.post(Constants.PRODUCT, Constants.PATHS.products.createProduct, newProduct)
		.subscribe(product => {
			this.loader.removeMessage("Creando producto");
			this.close.emit(true);
		}, err => {
			this.loader.removeMessage("Creando producto");
			this.close.emit(true);
		});
	}

	private cancel () {
		this.close.emit(true);
	}

	private validate () {
		if (!this.name) return false;
		if (!this.code) return false;
		return true;
	}


}



