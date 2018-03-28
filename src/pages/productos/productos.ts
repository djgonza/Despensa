import { Component, OnInit, Pipe, PipeTransform, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppMemoriaService } from './../../services/memoria.service';
import { AddProductosPage } from './../addProducto/addProducto';
import { ArticulosPage } from './../articulos/articulos';
import Config from './../../config';

@Component({
	selector: 'page-productos',
	templateUrl: 'productos.html'
})
export class ProductosPage implements OnInit {

	private config: object;
	private filter: string;

	constructor(
		public navCtrl: NavController, 
		private appMemoriaService: AppMemoriaService
		) {}

	ngOnInit() { 
		this.config = Config;
	}

	private navigateToArticulosPage (productoId) {
		this.appMemoriaService.setProductoSeleccionado(productoId);
		this.navCtrl.push(ArticulosPage);
	}

	private navigateToAddArticuloPage () {
		this.navCtrl.push(AddProductosPage);
	}

	private setSearchFilter (ev) {
		this.filter = ev.target.value;
	}

}

@Pipe({
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
}



