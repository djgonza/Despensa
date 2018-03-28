import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ArticulosService {

	constructor (
		private http: HttpService
	) {}

	public loadAllArticulos (): Observable<object[]> {
		return this.http.get('articulos/getAll');
	}

	public saveArticulo (articulo: object): Observable<object> {
		return this.http.post('articulos/save', articulo);
	}

	public updateArticuloCantidad (articulo): Observable<boolean> {
		return this.http.put('articulos/updateCantidadById', articulo);
	}

}