import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { mergeMap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {

		return next.handle(req);

		/*console.log("interceptor", req, next);

		return next.handle(req)
		.do((ev: HttpEvent<any>) => {
			console.log("interceptor do", ev);
		})
		.catch(err => {
			console.log("interceptor err", err);
			return next.handle(req);
		});*/

	}
}
