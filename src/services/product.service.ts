import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { MemoryService } from './memory.service';
import { Observable } from "rxjs/Observable";
import { tap, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from './../environment/environment';
import { AlertService } from './alert.service';

@Injectable()
export class ProductService {

	constructor (
		private http: HttpService, 
		private memory: MemoryService,
		private alertService: AlertService) {}

	public addProduct (product: object): Observable<object> {
		return this.http.post(environment.despensaRestApi + '/product/save', product)
		.pipe(
			tap(res => {
				console.log('products service map add product', res);
			this.memory.add(res, 'products');
			})
		)
		.catch((err: any) => Observable.throw(this.errorHandler(err)));
	}

	public getProducts (): Observable<object[]>  {
		return this.http.get(environment.despensaRestApi + '/product/get').pipe(
			tap(res => {
			console.log('products service map get products', res);
			this.memory.addMultiple(res, 'products');
		}))
		.catch((err: any) => Observable.throw(this.errorHandler(err)));
	}

	public updateProduct (productId: string, fields: object): Observable<object> {
		return this.http.put(environment.despensaRestApi + '/product/update', {
			id: productId,
			fields: fields
		}).pipe(
			tap(res => {
			console.log('products service map update product', res);
			this.memory.update(res, 'products');
		}))
		.catch((err: any) => Observable.throw(this.errorHandler(err)));
	}

	public deleteProduct (productId: string): Observable<object> {
		return this.http.delete(environment.despensaRestApi + '/product/delete' + productId)
		.pipe(
			tap(res => {
				console.log('products service map delete product', res);
				this.memory.delete(productId, 'products');
			}),
			catchError(err => {
				console.log("err catch in product service", err);
				return new ErrorObservable('Something bad happened; please try again later.');
			})
		)
		.catch((err: any) => Observable.throw(this.errorHandler(err)));
	}

	private errorHandler (err) {
		//TODO: Lellega un objeto error y en funcion de el
		//devuelve un string con el mensaje
		console.log('products service', err);
		switch (err.statusCode) {
			case 500:
				this.alertService.addMessage("¡Error en el servidor!");
				return "¡Error en el servidor!";
			case 401:
				this.alertService.addMessage("¡Acceso no autorizado!");
				return "¡Acceso no autorizado!";
			default:
				this.alertService.addMessage("¡Error desconocido!");
				return "¡Error desconocido!";
		}
	}

}