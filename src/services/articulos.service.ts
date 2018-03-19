import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ArticulosService {

	constructor (
		private http: HttpService
	) {}

	public saveArticulo (articulo: object): Observable<boolean> {
		return this.http.post('articulos/save', articulo);
	}

	public updateArticuloCantidad (articulo): Observable<boolean> {
		return this.http.put('articulos/updateCantidadById', articulo);
	}

}