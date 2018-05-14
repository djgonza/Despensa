import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { map } from 'rxjs/operators';

import * as Constants from './../../../models/constants';
import { Product } from './../../../models/product';
import { Category } from './../../../models/category';
import { Image } from './../../../models/image';
import { UnitsPage } from './../../units/units';

import { MemoryService } from './../../../services/memory.service';
import { HttpService } from '../../../services/http.service';
import { ImageService } from '../../../services/image.services';
import { LoaderService } from '../../../services/loader.service';

@Component({
	selector: 'product-component',
	templateUrl: 'product.component.html'
})
export class ProductComponent implements OnInit {

	@Input() product: Product;
	@Input() category: Category;
	@Output() openGalery = new EventEmitter<boolean>();
	private editing: boolean = false;
	private productEditing: Product;

	constructor(
		private navCtrl: NavController,
		private barcodeScanner: BarcodeScanner,
		private memory: MemoryService,
		private imageService: ImageService,
		private http: HttpService,
		private loader: LoaderService,
		private alertCtrl: AlertController
		) {}

	ngOnInit() { 
	}

	private getUnitsCountByIdProduct (idProduct) {
		var unitsCount = 0;
		this.memory.getValues(Constants.UNIT).filter(unit => {
			return unit.product == idProduct;
		}).forEach(unit => {
			unitsCount += unit.quantity;
		});
		return unitsCount;
	}

	private navigateToUnits () {
		this.memory.addSelect(this.product._id, Constants.PRODUCT);
		this.navCtrl.push(UnitsPage);
	}

	private getSelectedImage () {
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
			this.productEditing.code = barcodeData.text;
		}, (err) => {

		});
	}

	private selectImage () {
		this.openGalery.emit(true);
	}

	private getSelectedCategory () {
		return this.memory.getSelectedValue(Constants.CATEGORY);
	}

	private getImageLocation (imageId: string): string {
		return this.imageService.getImageLocation(imageId);
	}

	private update (e, item) {
		e.stopPropagation();
		item.close();
		this.editing = true;
		this.productEditing = Object.assign({}, this.product);
		var image = this.memory.getValue(Constants.IMAGE, this.product.image);
		this.memory.addSelect(image, Constants.IMAGE);
	}

	private saveUpdate (e) {
		e.stopPropagation();
		this.loader.addMessage("Actualizando producto");
		this.editing = false;
		this.productEditing.image = this.memory.getSelectedValue(Constants.IMAGE)._id;
		this.http.put(Constants.PRODUCT, Constants.PATHS.products.updateProduct, this.productEditing)
		.subscribe(validate => {
			this.loader.removeMessage("Actualizando producto");
		}, err => {
			this.loader.removeMessage("Actualizando producto");
		});
		
	}

	private cancel (e) {
		e.stopPropagation();
		this.editing = false;
	}

	private saveDelete () {
		this.loader.addMessage("Borrando producto");
		this.editing = false;
		this.http.delete(Constants.PRODUCT, this.product._id, Constants.PATHS.products.deleteProduct)
		.subscribe(validate => {
			this.loader.removeMessage("Borrando producto");
			this.editing = false;
		}, err => {
			this.loader.removeMessage("Borrando producto");
			this.editing = false;
		});
	}

	private delete (e) {
		e.stopPropagation();
		this.alertCtrl.create({
			message: `¿Quires eliminar el producto ${this.product.name}?`,
			buttons: [
			{
				text: 'Cancelar',
				handler: () => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Aceptar',
				handler: () => {
					this.saveDelete();
				}
			}
			]
		}).present();
	}

}



