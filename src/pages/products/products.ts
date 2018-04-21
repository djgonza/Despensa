import { Component, OnInit, Pipe, PipeTransform, Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ProductService } from './../../services/product.service';
import { MemoryService } from './../../services/memory.service';
import { AddProductPage } from './../addProduct/addProduct';

@Component({
	selector: 'page-productos',
	templateUrl: 'products.html'
})
export class ProductsPage implements OnInit {

	private config: object;
	private filter: string;
	private loader = null;

	constructor(
		public navCtrl: NavController,
		private productService: ProductService,
		private memoryService: MemoryService,
		private loadingCtrl: LoadingController
		) {}

	ngOnInit() { 
		this.getProducts();
		console.log(this.memoryService);
	}

	private presentLoading() {
		this.loader = this.loadingCtrl.create({
			content: 'Leyendo los productos'
		});
		this.loader.present();
	}

	private hideLoading () {
		this.loader.dismiss();
	}

	private getProducts () {
		this.presentLoading();
		this.productService.getProducts()
		.subscribe(products => {
			console.log('getProducts', products);
			this.hideLoading();
		}, err => {
			console.log(err);
			this.hideLoading();
		});
	}

	private navigateToAddProduct () {
		this.navCtrl.push(AddProductPage);
	}

	/*private navigateToArticulosPage (productoId) {
		this.appMemoriaService.setProductoSeleccionado(productoId);
		this.navCtrl.push(ArticulosPage);
	}

	private navigateToAddArticuloPage () {
		this.navCtrl.push(AddProductosPage);
	}

	private setSearchFilter (ev) {
		this.filter = ev.target.value;
	}*/

}

/*@Pipe({
	name: 'filterByName',
	pure: false
})

@Injectable()
export class FilterByName implements PipeTransform {
	transform(items: any[], field: string, value: string): any[] {
		if (!items) return [];
		if (!value || value.trim() == '') return items;
		return items.filter(it => it[field].toLowerCase().includes(value.toLowerCase()));
	}
}*/



