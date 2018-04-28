import { Component, OnInit, Pipe, PipeTransform, Injectable, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { MemoryService } from './../../services/memory.service';
import * as Constants from './../../models/constants';
import { HttpService } from './../../services/http.service';
import { ImageService } from '../../services/image.services';
import { ProductsPage } from './../products/products';
import { LoaderService } from '../../services/loader.service';

@Component({
	selector: 'page-categories',
	templateUrl: 'categories.html'
})
export class CategoriesPage implements OnInit {

	@Input() name: string;
	private image: object;
	private createNewCategory: boolean = false;
	private selectingImage: boolean = false;

	constructor(
		public navCtrl: NavController,
		private memory: MemoryService,
		private http: HttpService,
		private imageService: ImageService,
		private loader: LoaderService
		) {}

	ngOnInit() { 

	}

	private navigateToProducts (categoryId: string) {
		this.memory.addSelect(categoryId, Constants.CATEGORY);
		this.navCtrl.push(ProductsPage);
	}

	private getImageLocation (imageId: string): string {
		return this.imageService.getImageLocation(imageId);
	}

	private getCategories () {
		return this.memory.get(Constants.CATEGORY);
	}

	private openGalery () {
		this.selectingImage = true;
	}

	private addImage (image: object) {
		this.image = image;
		this.selectingImage = false;
	}

	private openCreateNewCategory () {
		this.createNewCategory = true;
	}

	private closeCreateNewCategory () {
		this.loader.removeMessage("Creando Categoria");
		this.createNewCategory = false;
		this.image = null;
		this.name = null;
	}

	private cancel () {
		this.createNewCategory = false;
		this.image = null;
		this.name = null;
	}

	private create () {
		this.loader.addMessage("Creando Categoria");
		this.http.post(Constants.CATEGORY, Constants.PATHS.categories.createCategory, {
			name: this.name,
			image: this.image
		}).subscribe(category => {
			this.closeCreateNewCategory();
		}, err => {
			this.closeCreateNewCategory();
		});
	}

	private validate () {
		if (!this.name) return false;
		return true;
	}

	private getCountProductsInCategory (categoryId: string): number {
		var products = this.memory.getValues(Constants.PRODUCT);
		return products.filter(product => {
			return product.category == categoryId
		}).length;
	} 

}



