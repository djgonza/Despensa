import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { RequestOptions, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { environment } from './../environment/environment';
import { MemoryService } from './memory.service';
import * as Constants from './../models/constants';
import { Category } from './../models/category';
import { Product } from './../models/product';
import { Unit } from './../models/unit';
import { Locations } from './../models/locations';
import { Image } from './../models/image';

@Injectable()
export class HttpService {

	private tokenApi: string = environment.usersApi;
	private _refreshToken: BehaviorSubject<string> = new BehaviorSubject<string>('');
	private _accessToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor(private http: HttpClient, private memory: MemoryService) { }

	public get(field: string, url: string): Observable<any> {
		return this.http.get(this.tokenApi + '/token/accessToken', this.getHeader(this._refreshToken.getValue())).pipe(
			catchError(this.handleError),
			concatMap(res => {
				return this.http.get(url, this.getHeader(res['accessToken'])).pipe(
					catchError(this.handleError),
					tap(res => {
						this.addMultipleToMemory(field, res);
					})
					);
			})
			);
	}

	//Peticiones post
	public post(field: string, url: string, body: object): Observable<any> {
		return this.http.get(this.tokenApi + '/token/accessToken', this.getHeader(this._refreshToken.getValue())).pipe(
			catchError(this.handleError),
			concatMap(res => {
				return this.http.post(url, body, this.getHeader(res['accessToken'])).pipe(
					catchError(this.handleError),
					tap(res => {
						this.addToMemory(field, res);
					})
					);
			})
			);
	}

	//Peticiones put
	public put(field: string, url: string, body: object): Observable<any> {
		return this.http.get(this.tokenApi + '/token/accessToken', this.getHeader(this._refreshToken.getValue())).pipe(
			catchError(this.handleError),
			concatMap(res => {
				return this.http.put(url, body, this.getHeader(res['accessToken'])).pipe(
					catchError(this.handleError),
					tap(res => {
						this.updateMemory(field, body);
					})
					);
			})
			);
	}

	//Peticiones delete
	public delete(field: string, id: string, url: string): Observable<any> {
		//TODO: pensarlo
		return this.http.get(this.tokenApi + '/token/accessToken', this.getHeader(this._refreshToken.getValue())).pipe(
			catchError(this.handleError),
			concatMap(res => {
				var headers = this.getHeader(res['accessToken']);
				headers['headers']['_id'] = id;
				return this.http.delete(url, headers).pipe(
					catchError(this.handleError),
					tap(res => {
						this.memory.delete(id, field);
					})
					);
			})
			);
	}

	public getRefreshToken (body: object): Observable<object> {
		return this.http.post(this.tokenApi + '/token/refreshToken', body)
		.pipe(
			tap((res) => {
				this._refreshToken.next(res['refreshToken']);
			}),
			catchError(this.handleError)
			);
	}

	private getAccessToken (): Observable<any> {
		return this.http.get(this.tokenApi + 'token/accessToken').pipe(
			tap(res => {
				this._accessToken.next(res['accessToken']);
			}),
			catchError(this.handleError)
			)
	}

	private handleError(error: HttpErrorResponse) {

		//TODO: crear object error en funcion del error que nos llega

		var err = {
			message: '',
			statusCode: null
		};
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
			err.message = 'An error occurred:', error.error.message;
		} else {
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
			err.message = 'An error occurred:', error.error;
			err.statusCode = error.status;
		}

		return new ErrorObservable(err);
	};

	private getHeader (token: string): object {
		return {
			headers: {
				'Authorization': token,
				//'Content-Type': 'application/json'
			}
		}
	}

	private addToMemory (field: string, object: object) {
		this.memory.add(field, this.parseJsonToObject(field, object));
	}

	private addMultipleToMemory (field: string, object: object[]) {
		object.forEach(item => {
			this.addToMemory(field, item);
		});
	}

	private updateMemory (field: string, object: object) {
		this.memory.update(field, object);
	}

	private parseJsonToObject (field: string, jsonObject: object): object {
		switch (field) {
			case Constants.CATEGORY: return Object.assign(new Category(null), jsonObject);
			case Constants.PRODUCT: return Object.assign(new Product(null, null, null), jsonObject);
			case Constants.UNIT: return Object.assign(new Unit(null, null, null, null), jsonObject);
			case Constants.LOCATION: return Object.assign(new Locations(null), jsonObject);
			case Constants.IMAGE: return Object.assign(new Image(null, null, null, null, null, null, null, null, null, null, null, null, null), jsonObject);
			default: return null;
		}

	}

	private parseObjectToJson (object): string {
		return JSON.stringify(object);
	}

}
