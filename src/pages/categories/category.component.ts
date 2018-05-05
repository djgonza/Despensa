import { Component, OnInit, Pipe, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { map } from 'rxjs/operators';

import { MemoryService } from './../../services/memory.service';
import { HttpService } from './../../services/http.service';
import { ImageService } from '../../services/image.services';
import { LoaderService } from '../../services/loader.service';

import * as Constants from './../../models/constants';

import { ProductsPage } from './../products/products';
import { Image } from './../../models/image';
import { Category } from './../../models/category';

@Component({
	selector: 'category',
	templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {

	@Input() category: Category;
	@Output() openGalery = new EventEmitter<boolean>();
	private editing: boolean = false;
	private categoryEditing: Category;


	constructor(private memory: MemoryService, 
		private imageService: ImageService,
		public navCtrl: NavController,
		private alertCtrl: AlertController,
		private http: HttpService,
		private loader: LoaderService) {}

	ngOnInit() { 
		
	}

	private navigateToProducts (categoryId: string) {
		if (this.editing) return;
		this.memory.addSelect(categoryId, Constants.CATEGORY);
		this.navCtrl.push(ProductsPage);
	}

	private getSelectedImage () {
		return this.memory.getSelect(Constants.IMAGE)
		.pipe(
			map((image: Image)=> {
				if (image) return image.location;
				return 'http://via.placeholder.com/1000x1000';	
			})
		);;
	}

	private getImageLocation (imageId: string): string {
		return this.imageService.getImageLocation(imageId);
	}

	private getCountProductsInCategory (categoryId: string): number {
		var products = this.memory.getValues(Constants.PRODUCT);
		return products.filter(product => {
			return product.category == categoryId
		}).length;
	}

	private selectImage () {
		this.openGalery.emit(true);
	}

	private update (e, item) {
		e.stopPropagation();
		item.close();
		this.editing = true;
		this.categoryEditing = Object.assign({}, this.category);
		var image = this.memory.getValue(Constants.IMAGE, this.category.image);
		this.memory.addSelect(image, Constants.IMAGE);
	}

	private cancel (e) {
		e.stopPropagation();
		this.editing = false;
	}

	private saveUpdate (e) {
		e.stopPropagation();
		this.editing = false;
		var editedCategory = this.categoryEditing;
		editedCategory.image = this.memory.getSelectedValue(Constants.IMAGE)._id;
		this.loader.addMessage("Actualizando Categoria");
		console.log(editedCategory);
		this.http.put(Constants.CATEGORY, Constants.PATHS.categories.updateCategory, editedCategory)
		.subscribe(res => {
			this.loader.removeMessage("Actualizando Categoria");
			this.editing = false;
		}, err => {
			this.loader.removeMessage("Actualizando Categoria");
			this.editing = false;
		});
	}

	private saveDelete () {
		this.loader.addMessage("Borrando Categoria");
		this.http.delete(Constants.CATEGORY, this.category._id, Constants.PATHS.categories.deleteCategory)
		.subscribe(res => {
			this.loader.removeMessage("Borrando Categoria");
			this.editing = false;
		}, err => {
			this.loader.removeMessage("Borrando Categoria");
			this.editing = false;
		});
	}

	private delete (e, item) {
		e.stopPropagation();
		item.close();
		this.alertCtrl.create({
			message: `¿Quires eliminar la categoria ${this.category.name}?`,
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



