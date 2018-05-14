import { Component, OnInit } from '@angular/core';

import { CategoriesPage } from '../categories/categories.page';
import { ProductsPage } from '../products/products';
import { GaleryPage } from './../galery/galery.page';
import { LocationsPage } from './../locations/locations';
import { SeekerPage } from './../seeker/seeker.page';

import { HttpService } from './../../services/http.service';
import { LoaderService } from './../../services/loader.service';

import * as Constants from './../../models/constants';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

	private tab1Root = CategoriesPage;
	private tab2Root = GaleryPage;
	private tab3Root = LocationsPage;
	private tab4Root = SeekerPage;

	constructor(
		private http: HttpService,
		private loaderService: LoaderService) {}

	ngOnInit() {

		this.loaderService.addMessage("Leyendo Imagenes");
		this.http.get(Constants.IMAGE, Constants.PATHS.images.getImages).subscribe(res => {
			this.loaderService.removeMessage("Leyendo Imagenes");
		});

		this.loaderService.addMessage("Leyendo Categorias");
		this.http.get(Constants.CATEGORY, Constants.PATHS.categories.getCategories).subscribe(res => {
			this.loaderService.removeMessage("Leyendo Categorias");
		});

		this.loaderService.addMessage("Leyendo Productos");
		this.http.get(Constants.PRODUCT, Constants.PATHS.products.getProducts).subscribe(res => {
			this.loaderService.removeMessage("Leyendo Productos");
		});

		this.loaderService.addMessage("Leyendo Unidades");
		this.http.get(Constants.UNIT, Constants.PATHS.units.getUnits).subscribe(res => {
			this.loaderService.removeMessage("Leyendo Unidades");
		});

		this.loaderService.addMessage("Leyendo Ubicaciones");
		this.http.get(Constants.LOCATION, Constants.PATHS.locations.getLocations).subscribe(res => {
			this.loaderService.removeMessage("Leyendo Ubicaciones");
		});

	}

}
