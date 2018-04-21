import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { RequestOptions, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { environment } from './../environment/environment';

@Injectable()
export class HttpService {

	private tokenApi: string = environment.usersApi;
	private _refreshToken: BehaviorSubject<string> = new BehaviorSubject<string>('');
	private _accessToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor(private http: HttpClient) { }

	//Peticiones get
	public get(url: string): Observable<any> {
		return this.http.get(this.tokenApi + '/token/accessToken', this.getHeader(this._refreshToken.getValue())).pipe(
			catchError(this.handleError),
			concatMap(res => {
				return this.http.get(url, this.getHeader(res['accessToken'])).pipe(
					catchError(this.handleError)
				);
			})
		);
	}

	//Peticiones post
	public post(url: string, body: object): Observable<any> {
		return this.http.get(this.tokenApi + '/token/accessToken', this.getHeader(this._refreshToken.getValue())).pipe(
			catchError(this.handleError),
			concatMap(res => {
				return this.http.post(url, body, this.getHeader(res['accessToken'])).pipe(
					catchError(this.handleError)
				);
			})
		);
	}

	//Peticiones put
	public put(url: string, body: object): Observable<any> {
		return this.http.get(this.tokenApi + '/token/accessToken', this.getHeader(this._refreshToken.getValue())).pipe(
			catchError(this.handleError),
			concatMap(res => {
				return this.http.put(url, body, this.getHeader(res['accessToken'])).pipe(
					catchError(this.handleError)
				);
			})
		);
	}

	//Peticiones delete
	public delete(url: string): Observable<any> {
		return this.http.get(this.tokenApi + '/token/accessToken', this.getHeader(this._refreshToken.getValue())).pipe(
			catchError(this.handleError),
			concatMap(res => {
				return this.http.delete(url, this.getHeader(res['accessToken'])).pipe(
					catchError(this.handleError)
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
				'Content-Type': 'application/json'
			}
		}
	}

}
