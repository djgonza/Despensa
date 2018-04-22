import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class MemoryService {
	
	private _products: BehaviorSubject<object[]> = new BehaviorSubject<object[]>(new Array());
	private _articles: BehaviorSubject<object[]> = new BehaviorSubject<object[]>(new Array());
	private _images: BehaviorSubject<object[]> = new BehaviorSubject<object[]>(new Array());
	private _locations: BehaviorSubject<object[]> = new BehaviorSubject<object[]>(new Array());
	private _selectedProduct: BehaviorSubject<object> = new BehaviorSubject<object>(null);
	private _selectedArticle: BehaviorSubject<object> = new BehaviorSubject<object>(null);
	private _selectedImage: BehaviorSubject<object> = new BehaviorSubject<object>({location: 'http://via.placeholder.com/1000x1000'});

	constructor () {
		console.log(this);
	}

	/*
	@field: nombre del array de objetos
	*/
	private getBS (field: string): BehaviorSubject<object[]> {
		switch (field) {
			case "products":
				return this._products;
			case "articles":
				return this._articles;
			case "images":
				return this._images;
			case "locations":
				return this._locations;
			default:
			break;
		}
	}

	/*
	@field: nombre del array de objetos
	*/
	private getSelectBS (field: string): BehaviorSubject<object> {
		switch (field) {
			case "selectedProduct":
				return this._selectedProduct;
			case "selectedArticles":
				return this._selectedArticle;
			case "selectedImage":
				return this._selectedImage;
			default:
				return;
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

	/*
	@field: nombre del array de objetos
	*/
	public get (field: string): Observable<object[]> {
		return this.getBS(field).asObservable();
	}

	/*
	@field: nombre del array de objetos
	*/
	public getSelect (field: string): Observable<object> {
		return this.getSelectBS(field).asObservable();
	}

	/* 
	@object: objecto a insertar
	@field: nombre del array de objetos
	@first: true al principio, false al final, default principio 
	*/
	public add (object: object, field: string, first: boolean = true): void {
		var bs: BehaviorSubject<object[]> = this.getBS(field);
		var values = bs.getValue();
		if (first)
			values.unshift(object);
		else
			values.push(object);
		bs.next(values);
	}

	public addSelect (item: object, field: string): void {
		this.getSelectBS(field).next(item);
	}

	/* 
	@objects: objectos a insertar
	@field: nombre del array de objetos
	@first: true al principio, false al final, default principio 
	*/
	public addMultiple (objects: object[], field: string, first: boolean = true): void {
		objects.forEach(object => {
			this.add(object, field, first);
		});
	}

	/* 
	@id: id del objecto a eliminar
	@field: nombre del array de objetos
	*/
	public delete (id: string, field: string): void {
		var bs: BehaviorSubject<object[]> = this.getBS(field);
		var newValues = bs.getValue().filter(value => {
			return value['id'] != id;
		});
		bs.next(newValues);
	}

	/* 
	@object: objecto a actualizar
	@field: nombre del array de objetos
	*/
	public update (object: object, field: string): void {
		var bs: BehaviorSubject<object[]> = this.getBS(field);
		var values = bs.getValue();
		var valueIndex = values.findIndex(value => {
			return value['id'] == object['id'];
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
		return this.getBS('images').getValue().find(image => {
			return image['_id'] == imageId;
		})['location'];
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