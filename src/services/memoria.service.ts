import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { tap } from 'rxjs/operators/tap';

/* Services */
import { HttpService } from './http.service';

@Injectable()
export class AppMemoriaService {
	
	private _productos: BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>(new Array());

	constructor (private http: HttpService) {
		
	}

	public loadProductos () {
		this.http.get('/productos')
		.pipe(
			/*tap((res) => {
				console.log('res', res);
			}),
			tap((res) => {
				console.log('res 1', res);
			})*/
		)
		.subscribe((productos: Object[]) => {
			this.loadAllArticulosProductos(productos);
			this._productos.next(productos);
		}, err => {
			console.log('error', err);
		});
	}

	private loadAllArticulosProductos (productos) {
		
		for (var i in productos) {
			this.loadArticulosByProducto (productos[i]);
		}
		
	}

	private loadArticulosByProducto (producto) {
		this.http.get('/articulos?id='+ producto._id)
		.pipe(
			/*tap((res) => {
				console.log('res', res);
			}),
			tap((res) => {
				console.log('res 1', res);
			})*/
		)
		.subscribe((articulos: Object[]) => {
			producto.articulos = articulos;
		}, err => {
			console.log('error', err);
		});
	}

	/* Productos */
	public addProducto(producto) {
		return this.http.post('/productos', producto)
		.pipe(
			tap((res) => {
				var productosEnMemoria = this._productos.getValue();
				productosEnMemoria.push(producto);
				this._productos.next(productosEnMemoria);
			})
		);
	}

	public get productos(): Observable<Object[]> {
		return this._productos.asObservable();
	}

	/* articulos */
	public addArticulo (articulo) {
		return this.http.post('/articulos', articulo)
		.pipe(
			tap((res) => {
				
			})
		);
	}

}