import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';

import * as Constants from './../../models/constants';
import { Product } from './../../models/product';

import { MemoryService } from './../../services/memory.service';
import { HttpService } from '../../services/http.service';
import { ImageService } from '../../services/image.services';
import { LoaderService } from '../../services/loader.service';

import { UnitsPage } from './../units/units';

@Component({
	selector: 'page-productos',
	templateUrl: 'products.html'
})
export class ProductsPage implements OnInit {

	//TODO: click en nombre abre un input flotante

	private name: string;
	private code: string;
	private image: object;
	private selectingImage: boolean = false;
	private createNewProduct: boolean = false;
	private searchFilterValue: string = '';
	private searchCodeFilterValue: string = '';

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
		return this.memory.getValues(Constants.UNIT).filter(unit => {
			return unit.product == idProduct;
		}).length;
	}

	private searchFilter (e) {
		this.searchFilterValue = e.target.value;
	}

	private searchCodeFilter () {

		if (this.searchCodeFilterValue){
			this.searchCodeFilterValue = '';
			return
		}

		this.barcodeScanner.scan().then((barcodeData) => {
			this.searchCodeFilterValue = barcodeData.text;
		}, (err) => {
			console.log(err);
		});
	}

	private showPrompt() {
		let prompt = this.alertCtrl.create({
			title: 'Nombre',
			message: "Ingresa el nombre del producto",
			inputs: [
			{
				name: 'name',
				placeholder: 'Nombre',
				value: this.name
			},
			],
			buttons: [
			{
				text: 'Cancelar',
				handler: data => {
					//console.log('Cancel clicked', data);
				}
			},
			{
				text: 'Guardar',
				handler: data => {
					//console.log('Saved clicked', data);
					this.name = data.name;
				}
			}
			]
		});
		prompt.present();
	}

	private navigateToUnits (productId: string) {
		this.memory.addSelect(productId, Constants.PRODUCT);
		this.navCtrl.push(UnitsPage);
	}

	private openGalery () {
		this.selectingImage = true;
	}

	private closeGalery (e) {
		this.selectingImage = false;
	}

	private addImage (image: object) {
		this.image = image;
		this.selectingImage = false;
	}

	private openCreateNewProduct () {
		this.createNewProduct = true;
	}

	private getSelectedCategory () {
		return this.memory.getSelectedValue(Constants.CATEGORY);
	}

	private getImageLocation (imageId: string): string {
		return this.imageService.getImageLocation(imageId);
	}

	private getProducts (): Observable<any> {
		return this.memory.get(Constants.PRODUCT);
	}

	private loadCode () {
		this.barcodeScanner.scan().then((barcodeData) => {
			this.code = barcodeData.text;
		}, (err) => {

		});
	}

	private save () {
		this.loader.addMessage("Creando producto");
		var newProduct = new Product(this.name, this.code, this.getSelectedCategory(), null, this.image['_id']);
		this.http.post(Constants.PRODUCT, Constants.PATHS.products.createProduct, newProduct)
		.subscribe(product => {
			this.closeCreateNewProduct();
		}, err => {
			this.closeCreateNewProduct();
		});
	}

	private cancel () {
		this.name = null;
		this.code = null;
		this.image = null;
		this.createNewProduct = false;
	}

	private closeCreateNewProduct () {
		this.loader.removeMessage("Creando producto");
		this.name = null;
		this.code = null;
		this.image = null;
		this.createNewProduct = false;
	}

	private validate () {
		if (!this.name) return false;
		if (!this.code) return false;
		return true;
	}


}



