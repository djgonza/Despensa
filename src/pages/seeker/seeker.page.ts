import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MemoryService } from './../../services/memory.service';
import * as Constants from './../../models/constants';

import { CategoryComponent } from './../categories/category.component';
import { ProductComponent } from './../products/components/product.component';

@Component({
	selector: 'page-categories',
	templateUrl: 'seeker.page.html'
})
export class SeekerPage implements OnInit {

	private codeFilter: string = '';
	private stringFilter: string = '';

	constructor(
		private memory: MemoryService,
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		private barcodeScanner: BarcodeScanner
		) {}

	ngOnInit() { 

	}

	private setSearchFilter(e) {
		this.stringFilter = e.target.value;
	}

	private getProducts () {
		return this.memory.get(Constants.PRODUCT);
	}

	private loadCode () {

		if (this.codeFilter) {
			this.codeFilter = '';
			return;
		}

		this.barcodeScanner.scan().then((barcodeData) => {
			this.codeFilter = barcodeData.text;
		}, (err) => {

		});
	}

}



