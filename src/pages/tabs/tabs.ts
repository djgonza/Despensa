import { Component, OnInit } from '@angular/core';
import { ProductsPage } from '../products/products';
import { LoadingController } from 'ionic-angular';
// import { AddUbicacion } from '../addUbicacion/addUbicacion';
// import { SearchProductosPage } from '../searchProducto/searchProducto';

import { GaleryPage } from './../galery/galery.page';

import { ProductService } from './../../services/product.service';
import { ImageService } from './../../services/image.services';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

	private loader = null;
	private loaderStep: number = 0;
	private tab1Root = ProductsPage;
	private tab2Root = GaleryPage;
	private interval;
	private leyendo = [];
	// tab2Root = SearchProductosPage;
	// tab3Root = AddUbicacion;

	constructor(private loadingCtrl: LoadingController,
		private productService: ProductService,
		private imageService: ImageService) {}

	ngOnInit() { 

		this.addLeyendoItem('Products');
		this.productService.getProducts().subscribe(res => {
			this.removeLeyendoItem('Products');
		});

		this.addLeyendoItem('Images');
		this.imageService.getImages().subscribe(res => {
			this.removeLeyendoItem('Images');
		});

		//Interval para el loading
		this.interval = setInterval(() => { 
			this.changeLoandingContent ();
			this.checkLeyendo();
		}, 500);
		this.presentLoading();

	}

	private addLeyendoItem (item: string) {
		this.leyendo.push(item);
	}

	private removeLeyendoItem (item: string) {
		this.leyendo.splice(this.leyendo.findIndex(item => {
			return item == 'Productos'
		}), 1);
	}

	private checkLeyendo() {
		if (this.leyendo.length == 0) {
			clearInterval(this.interval);
			this.interval = null;
			this.hideLoading();
		}
	}

	private presentLoading() {
		this.loader = this.loadingCtrl.create({
			content: 'Cargando.'
		});
		this.loader.present();
	}

	private hideLoading () {
		this.loader.dismiss();
		this.loader = null;
	}

	private changeLoandingContent () {

		if (this.loader) {
			switch (this.loaderStep) {
				case 0:
					this.loader.data.content = "Cargando.";
					this.loaderStep = 1;
					break;
				case 1:
					this.loader.data.content = "Cargando..";
					this.loaderStep = 2;
					break;
				case 2:
					this.loader.data.content = "Cargando...";
					this.loaderStep = 0;
					break;
				default:
					break;
			}
			
		}
		
	}

}
