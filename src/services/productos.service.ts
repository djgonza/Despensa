import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductosService {

	constructor (
		private http: HttpService
	) {}

	public loadAllProductos () {
		return this.http.get('productos/getAll')
		//.pipe(
			/*tap((res) => {
				console.log('res', res);
			}),
			tap((res) => {
				console.log('res 1', res);
			})*/
		//);
	}

	public saveProducto (producto: object): Observable<object> {
		return this.http.post('productos', producto);
	}

	/*public updateArticulo (articulo: object): Observable<object> {

	}

	public removeArticulo (articuloId: string): Observable<boolean> {

	}*/

}