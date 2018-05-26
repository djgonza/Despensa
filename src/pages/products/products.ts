import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import * as Constants from './../../models/constants';
import { Product } from './../../models/product';
import { Galery } from './../../components/galery/galery';

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

	private searchFilterValue: string = '';
	private searchCodeFilterValue: string = '';
	private showNewProduct: boolean = false;

	constructor(
		private navCtrl: NavController,
		private barcodeScanner: BarcodeScanner,
		private memory: MemoryService,
		private imageService: ImageService,
		private http: HttpService,
		private loader: LoaderService,
		private alertCtrl: AlertController,
		public modalCtrl: ModalController,
		) {}

	ngOnInit() { 
	
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
			console.log(barcodeData);
			this.searchCodeFilterValue = barcodeData.text;
		}, (err) => {
			console.log('err', err);
		});
	}

	private openGalery () {
		this.modalCtrl.create(Galery, { btnClose: true }).present();
	}

	private openShowNewProduct () {
		this.memory.addSelect(null, Constants.IMAGE);
		this.showNewProduct = true;
	}

	private closeShowNewProduct () {
		this.showNewProduct = false;
	}

	private getSelectedCategory () {
		return this.memory.getSelectedValue(Constants.CATEGORY);
	}

	private getProducts (): Observable<any> {
		return this.memory.get(Constants.PRODUCT);
	}


}



