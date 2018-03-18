import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ArticulosService {

	constructor (
		private http: HttpService
	) {}

	public loadArticulosByProducto (producto: object): Observable<object[]> {
		return this.http.get('articulos/getByProducto?=producto' + producto['_id']);
	}

	public saveArticulo (articulo: object): Observable<boolean> {
		return this.http.post('articulos', articulo);
	}

	/*public updateArticulo (articulo: object): Observable<object> {

	}

	public removeArticulo (articuloId: string): Observable<boolean> {

	}*/

}