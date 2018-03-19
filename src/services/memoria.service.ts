import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { tap } from 'rxjs/operators/tap';

/* Services */
import { ProductosService } from './productos.service';
import { ArticulosService } from './articulos.service';


@Injectable()
export class AppMemoriaService {
	
	private _productos: BehaviorSubject<object[]> = new BehaviorSubject<object[]>(new Array());
	
	constructor (
		private productosService: ProductosService,
		private articulosService: ArticulosService
	) {}

	/* Accesores */
	public get productos(): Observable<Object[]> {
		return this._productos.asObservable();
	}

	/* Productos */
	public loadAllProductos () {
		this.productosService.loadAllProductos()
		.subscribe((productos: Object[]) => {
			this._productos.next(productos);
		}, err => {
			console.log('error', err);
		});
	}

	public addProducto(producto) {
		return this.productosService.saveProducto(producto)
		.pipe(
			tap((res) => {
				var productosEnMemoria = this._productos.getValue();
				productosEnMemoria.push(res);
				this._productos.next(productosEnMemoria);
			})
		);
	}

	/* articulos */
	public addArticulo (articulo) {
		return this.articulosService.saveArticulo(articulo)
		.pipe(
			tap((res) => {
				var productos = this._productos.getValue();
				productos.find ((producto) => {
					return producto['_id'] == articulo.producto;
				})['articulos'].push(articulo);
				/*productos['articulos'] = productos['articulos'].sort((a,b) => {
					return new Date(b['fechaCaducidad']) - new Date(['fechaCaducidad']);
				})*/
				this._productos.next(productos);
			})
		);
	}

	public updateArticuloCantidad (articuloId, cantidad) {
		return this.articulosService.updateArticuloCantidad({
			"_id": articuloId,
			"cantidad": cantidad
		});
	}

}