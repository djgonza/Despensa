// import { Component, OnInit, Pipe, PipeTransform, Injectable } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import { AppMemoriaService } from './../../services/memoria.service';
// import { AddProductosPage } from './../addProducto/addProducto';
// import { ArticulosPage } from './../articulos/articulos';
// import Config from './../../config';

// @Component({
// 	selector: 'page-search-productos',
// 	templateUrl: 'searchProducto.html'
// })
// export class SearchProductosPage implements OnInit {

// 	private config: object;
// 	private filter: string;

// 	constructor(
// 		public navCtrl: NavController, 
// 		private appMemoriaService: AppMemoriaService,
// 		private barcodeScanner: BarcodeScanner
// 		) {}

// 	ngOnInit() { 
// 		this.config = Config;
// 	}

// 	private loadCodigo () {
// 		this.barcodeScanner.scan().then((barcodeData) => {
//  			// Success! Barcode data is here
//  			this.filter = barcodeData.text;
//  		}, (err) => {
//     		// An error occurred
//     	});
// 	}

// 	private navigateToArticulosPage (productoId) {
// 		this.appMemoriaService.setProductoSeleccionado(productoId);
// 		this.navCtrl.push(ArticulosPage);
// 	}

// 	private setSearchFilter (ev) {
// 		this.filter = ev.target.value;
// 	}

// }

// @Pipe({
// 	name: 'filterByBarcode',
// 	pure: false
// })

// @Injectable()
// export class filterByBarcode implements PipeTransform {
// 	transform(items: any[], field: string, value: string): any[] {
// 		if (!items) return [];
// 		if (!value || value.trim() == '') return items;
// 		return items.filter(it => it[field].toLowerCase().includes(value.toLowerCase()));
// 	}
// }



