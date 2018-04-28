import { Component } from '@angular/core';
import moment from 'moment';
import { Observable } from "rxjs/Observable";
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemoryService } from './../../services/memory.service';
import * as Constants from './../../models/constants';
import { HttpService } from './../../services/http.service';
import { LocationService } from './../../services/location.service';
import { LoaderService } from '../../services/loader.service';
import { Unit } from './../../models/unit';

@Component({
	selector: 'page-units',
	templateUrl: 'units.html'
})
export class UnitsPage {

	private isNew: boolean = false;
	private location: string;
	private expirationDate: Date;
	private quantity: number = 0;

	constructor(
		public navCtrl: NavController, 
		private memory: MemoryService,
		private http: HttpService,
		private loader: LoaderService,
		private locationService: LocationService
		) {
	}

	private cancel () {
		this.isNew = false;
	}

	private save () {
		this.loader.addMessage("Creando unidad");
		this.http.post(Constants.UNIT, Constants.PATHS.units.createUnit, new Unit(
			this.expirationDate,
			this.location,
			this.getSelectedProduct(),
			this.quantity
		)).subscribe(unit => {
			this.closeCreateNewUnit();
		}, err => {
			this.closeCreateNewUnit();
		});

	}

	private closeCreateNewUnit () {
		this.loader.removeMessage("Creando unidad");
		this.expirationDate = null;
		this.location = null;
		this.quantity = 0;
		this.isNew = false;
	}

	private openCreateNewUnit () {
		this.isNew = true;
	}

	private addQuantityPlus (unit) {
		var unitCloned = Object.assign({}, unit);
		unitCloned.quantity = unitCloned.quantity + 1;
		this.http.put(Constants.UNIT, Constants.PATHS.units.updateUnit, unitCloned)
		.subscribe(res => {

		});
	}

	private addQuantityLess (unit) {
		var unitCloned = Object.assign({}, unit);
		if (unitCloned.quantity > 0) unitCloned.quantity = unitCloned.quantity - 1;
		this.http.put(Constants.UNIT, Constants.PATHS.units.updateUnit, unitCloned)
		.subscribe(res => {

		});
	}

	private goBack () {
		this.navCtrl.pop();
	}

	private getLocations (): Observable<any[]> {
		return this.memory.get(Constants.LOCATION);
	}

	private getLocationById (locationId: string) {
		return this.locationService.getLocationById(locationId);
	}

	private getUnits (): Observable<any[]> {
		return this.memory.get(Constants.UNIT);
	}

	private getSelectedProduct () {
		return this.memory.getSelectedValue(Constants.PRODUCT);
	}

	private updateCantidad (articulo, cantidad) {
		
	}

	private getClassByDate (date) {

		var dateFormated = new Date(date).getTime();
		var thisDate = new Date();

		if (dateFormated < thisDate.getTime()) return 'bg-red';

		var thisDateAndOneMonth = thisDate.setMonth(thisDate.getMonth() + 1);
		if (dateFormated < thisDateAndOneMonth) {
			return 'bg-orange';
		}
		
		return 'bg-green';

	}

	private getTimeToEnd (date) {
		if (!date) return;
		var thisDate = new Date().getTime();
		var dateFormated = new Date(date).getTime();
		return thisDate - dateFormated;
	}

	private validate () {
		if (!this.location) return false;
		if (!this.expirationDate) return false;
		return true;
	}

}

@Pipe({
	name: 'timeToEnd'
})

@Injectable()
export class TimeToEnd implements PipeTransform {
	transform(date: string): string {

		var diffMS = moment(date).diff(moment());
		var toDate = moment.duration(diffMS);

		var years = toDate.years();
		var months = toDate.months();
		var days = toDate.days();

		if (years > 0) {
			return `${toDate.years()} años ${toDate.months()} meses ${toDate.days()} dias`;
		}

		if (months > 0) {
			return `${toDate.months()} meses ${toDate.days()} dias`;
		}

		if (days > 0) {
			return `${toDate.days()} dias`;
		}

		if (days == 0) {
			return "Caduca Hoy";
		} 

		return "Caducado";

	}

}
















