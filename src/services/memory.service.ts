import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { tap } from 'rxjs/operators/tap';
import * as Constants from './../models/constants';
import { Category } from './../models/category';
import { Product } from './../models/product';
import { Unit } from './../models/unit';
import { Locations } from './../models/locations';
import { Image } from './../models/image';

@Injectable()
export class MemoryService {
	
	private _categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(new Array());
	private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(new Array());
	private _units: BehaviorSubject<Unit[]> = new BehaviorSubject<Unit[]>(new Array());
	private _images: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>(new Array());
	private _locations: BehaviorSubject<Locations[]> = new BehaviorSubject<Locations[]>(new Array());
	private _selectedCategory: BehaviorSubject<string> = new BehaviorSubject<string>("");
	private _selectedProduct: BehaviorSubject<string> = new BehaviorSubject<string>("");
	private _selectedUnit: BehaviorSubject<string> = new BehaviorSubject<string>("");
	private _selectedImage: BehaviorSubject<Image> = new BehaviorSubject<Image>(null);

	constructor () {
		console.log(this);
	}

	/*
	@field: nombre del array de objetos
	*/
	private getBS (field: string): BehaviorSubject<object[]> {
		switch (field) {
			case Constants.CATEGORY:
				return this._categories;
			case Constants.PRODUCT:
				return this._products;
			case Constants.UNIT:
				return this._units;
			case Constants.IMAGE:
				return this._images;
			case Constants.LOCATION:
				return this._locations;
			default:
			break;
		}
	}

	/*
	@field: nombre del array de objetos
	*/
	private getSelectBS (field: string): BehaviorSubject<any> {
		switch (field) {
			case Constants.CATEGORY:
				return this._selectedCategory;
			case Constants.PRODUCT:
				return this._selectedProduct;
			case Constants.UNIT:
				return this._selectedUnit;
			case Constants.IMAGE:
				return this._selectedImage;
		}
	}

	public getSelectedItemById (id: string, field: string) {
		var items = this.getBS(field).getValue();
		return Observable.create(observer => {
			var item = items.find(item => {
				return item['_id'] == id;
			});
			observer.next(item);
		});
		
	}

	public getValues (field: string): any {
		return this.getBS(field).getValue();
	}

	public getSelectedValue (field: string) {
		return this.getSelectBS(field).getValue();
	}

	public getValue (field: string, id: string): any {
		var values = this.getValues(field);
		var index = values.findIndex(item => {
			return item._id == id
		});
		return values[index];
	}

	/*
	@field: nombre del array de objetos
	*/
	public get (field: string): Observable<object[]> {
		return this.getBS(field).asObservable();
	}

	/*
	@field: nombre del array de objetos
	*/
	public getSelect (field: string): Observable<any> {
		return this.getSelectBS(field).asObservable();
	}

	/* 
	@object: objecto a insertar
	@field: nombre del array de objetos
	@first: true al principio, false al final, default principio 
	*/
	public add (field: string, object: object, first: boolean = true): void {
		var bs: BehaviorSubject<object[]> = this.getBS(field);
		var values = bs.getValue();
		if (first)
			values.unshift(object);
		else
			values.push(object);
		bs.next(values);
	}

	public addSelect (value: any, field: string): void {
		this.getSelectBS(field).next(value);
	}

	/* 
	@objects: objectos a insertar
	@field: nombre del array de objetos
	@first: true al principio, false al final, default principio 
	*/
	public addMultiple (field: string, objects: object[], first: boolean = true): void {
		objects.forEach(object => {
			this.add(field, object, first);
		});
	}

	/* 
	@id: id del objecto a eliminar
	@field: nombre del array de objetos
	*/
	public delete (id: string, field: string): void {
		var bs: BehaviorSubject<object[]> = this.getBS(field);
		var newValues = bs.getValue().filter(value => {
			return value['_id'] != id;
		});
		bs.next(newValues);
	}

	/* 
	@object: objecto a actualizar
	@field: nombre del array de objetos
	*/
	public update (field: string, object: object): void {
		var bs: BehaviorSubject<object[]> = this.getBS(field);
		var values = bs.getValue();
		var valueIndex = values.findIndex(value => {
			return value['_id'] == object['_id'];
		});
		values[valueIndex] = object;
		bs.next(values);
	}

	//Products
	public getProductsCount (): Observable<number> {
		return Observable.create(observer => {
			observer.next(this._products.getValue().length);
		});
	}

	//Articles
	public getArticlesCountByIdProduct (productId: string): Observable<number> {
		var products = this._products.getValue();
		products.filter(product => {
			return product['id'] != productId;
		});
		return Observable.create(observer => {
			observer.next(products.length);
		});
	}

	public getArticleQuantity (articleId: string): Observable<number> {
		return Observable.create(observer => {
			var article = this.getBS('articles').getValue().find(article => {
				return article['id'] == articleId;
			});
			//TODO: revisar propiedad quantity
			observer.next(article['quantity']);
		});
	}

	public updateArticleQuantity (articleId: string, quantity: number): void {
		var bs: BehaviorSubject<object[]> = this.getBS('articles');
		var values = bs.getValue();
		var valueIndex = values.findIndex(value => {
			return value['id'] == articleId;
		});
		values[valueIndex]['quantity'] = quantity;
		bs.next(values);
	}

	//Images
	public getImagePathById (imageId: string): string {
		var img = this.getBS(Constants.IMAGE).getValue().find((image: Image) => {
			return image._id == imageId;
		})
		if (img) {
			return img['location'];
		}else {
			return null;
		}
		
	}

	// public getImagePathByIdProduct (productId: string): Observable<string> {
	// 	var image = this.getBS('images').getValue().filter(image => {
	// 		return image['prod'] == imageId;
	// 	});
	// 	return Observable.create(observer => {
	// 		observer.next(image['path']);
	// 	});
	// }

}