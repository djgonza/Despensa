// import { Component } from '@angular/core';
// import moment from 'moment';
// import { Injectable, Pipe, PipeTransform } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { AppMemoriaService } from './../../services/memoria.service';
// import { AddArticulo } from './../addArticulo/addArticulo';

// @Component({
// 	selector: 'page-articulos',
// 	templateUrl: 'articulos.html'
// })
// export class ArticulosPage {

// 	constructor(
// 		public navCtrl: NavController, 
// 		private appMemoriaService: AppMemoriaService
// 		) {
// 	}

// 	private goBack () {
// 		this.navCtrl.pop();
// 	}

// 	private navigateToAddArticulosPage () {
// 		this.navCtrl.push(AddArticulo)
// 	}

// 	private updateCantidad (articulo, cantidad) {

// 		if(cantidad < 0) return;

// 		this.appMemoriaService.updateArticuloCantidad(articulo['_id'], cantidad)
// 		.subscribe((res) => {
// 			//Cargando...
// 		}, (err) => {
// 			console.log(err);
// 		})
// 	}

// 	private getClassByDate (date) {

// 		var dateFormated = new Date(date).getTime();
// 		var thisDate = new Date();

// 		if (dateFormated < thisDate.getTime()) return 'bg-red';

// 		var thisDateAndOneMonth = thisDate.setMonth(thisDate.getMonth() + 1);
// 		if (dateFormated < thisDateAndOneMonth) {
// 			return 'bg-orange';
// 		}
		
// 		return 'bg-green';

// 	}

// 	private getTimeToEnd (date) {
// 		if (!date) return;
// 		var thisDate = new Date().getTime();
// 		var dateFormated = new Date(date).getTime();
// 		return thisDate - dateFormated;
// 	}

// }

// @Pipe({
// 	name: 'filterByProducto',
// 	pure: false
// })

// @Injectable()
// export class FilterByProducto implements PipeTransform {
// 	transform(items: any[], field: string, value: string): any[] {
// 		if (!items) return [];
// 		return items.filter(it => it[field] == value);
// 	}
// }

// @Pipe({
// 	name: 'timeToEnd'
// })

// @Injectable()
// export class TimeToEnd implements PipeTransform {
// 	transform(date: string): string {

// 		var diffMS = moment(date).diff(moment());
// 		var toDate = moment.duration(diffMS);

// 		var years = toDate.years();
// 		var months = toDate.months();
// 		var days = toDate.days();

// 		if (years > 0) {
// 			return `${toDate.years()} años ${toDate.months()} meses ${toDate.days()} dias`;
// 		}

// 		if (months > 0) {
// 			return `${toDate.months()} meses ${toDate.days()} dias`;
// 		}

// 		if (days > 0) {
// 			return `${toDate.days()} dias`;
// 		}

// 		if (days == 0) {
// 			return "Caduca Hoy";
// 		} 

// 		return "Caducado";

// 	}

// }
















