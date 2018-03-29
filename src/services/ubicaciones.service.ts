import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UbicacionesService {

	constructor (
		private http: HttpService
	) {}

	public loadAllUbicaciones (): Observable<object[]> {
		return this.http.get('ubicaciones/getAll');
	}

	public saveUbicacion (ubicacion: object): Observable<object> {
		return this.http.post('ubicaciones/save', ubicacion);
	}

}