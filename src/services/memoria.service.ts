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
	private _articulos: BehaviorSubject<object[]> = new BehaviorSubject<object[]>(new Array());
	private _productoSeleccionado: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	private _articuloSeleccionado: BehaviorSubject<string> = new BehaviorSubject<string>(null);

	constructor (
		private productosService: ProductosService,
		private articulosService: ArticulosService
	) {}

	public init (){
		this.loadAllProductos();
		this.loadAllArticulos();
		console.log(this);
	}

	/* Accesores */
	public get productos(): Observable<Object[]> {
		return this._productos.asObservable();
	}
	public get productosCount(): number {
		return this._productos.getValue().length;
	}
	public get productoSeleccionado(): string {
		return this._productoSeleccionado.getValue();
	}
	public setProductoSeleccionado(productoId: string) {
		this._productoSeleccionado.next(productoId);
	}
	public get articulos(): Observable<Object[]> {
		return this._articulos.asObservable();
	}
	public articulosCountByProducto(): number {
		var productoId = this._productoSeleccionado.getValue();
		return this._articulos.getValue().filter((value) => {
			return value['producto'] == productoId
		}).length;
	}
	public get articuloSeleccionado(): string {
		return this._articuloSeleccionado.getValue();
	}

	/* Productos */
	public loadAllProductos () {
		this.productosService.loadAllProductos()
		.subscribe((productos: object[]) => {
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
	public loadAllArticulos() {
		this.articulosService
		.loadAllArticulos()
		.subscribe((articulos: object[]) => {
			this._articulos.next(articulos);
		}, (err) => {
			console.log(err);
		})
	}

	public addArticulo (articulo) {
		return this.articulosService.saveArticulo(articulo)
		.pipe(
			tap((articuloCreado) => {
				var articulos = this._articulos.getValue();
				articulos.push(articuloCreado);
				this._articulos.next(articulos);
			})
		);
	}

	public updateArticuloCantidad (articuloId, cantidad) {
		return this.articulosService.updateArticuloCantidad({
			"_id": articuloId,
			"cantidad": cantidad
		}).pipe(tap((res) => {
			var articulos = this._articulos.getValue();
			var index = articulos.findIndex((articulo) => {
				return articulo['_id'] == res['_id'];
			});
			articulos[index]['cantidad'] = res['cantidad'];
			this._articulos.next(articulos);
		}));
	}

	public getCountArticulosByProducto (productoId) {
		var count = 0;
		this._articulos.getValue().forEach((articulo) => {
			if (articulo['producto'] == productoId)
				count++;
		});
		return count;
	}

}