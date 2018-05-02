import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import moment from 'moment';
import { Unit } from './../../models/unit';
import { LocationService } from './../../services/location.service';
import * as Constants from './../../models/constants';
import { HttpService } from './../../services/http.service';

@Component({
	selector: 'unit-component',
	templateUrl: 'unit.component.html'
})
export class UnitComponent implements OnInit {

	@Input() unit: Unit;
	private showMenu: boolean = false;

	constructor(private alertCtrl: AlertController, private locationService: LocationService, private http: HttpService) {}

	ngOnInit () {

	}

	private getLocationById (locationId: string) {
		return this.locationService.getLocationById(locationId);
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

	private clickEvent (e) {
		//console.log(e);
		this.showMenu = false;
	}

	private getStatus (date: Date) {
		var diffMS = moment(date).diff(moment());
		if (diffMS < 0) return 'unit-danger'; //Semana
		if (diffMS < 604800000) return 'unit-alert'; //Semana
		if (diffMS < 1209600000) return 'unit-good'; //14 dias
		return;
	}

	private panEvent (e, item) {
		//console.log(e);
		if (e.deltaX < -200 && !this.showMenu) {
			this.showMenu = true;
			// let confirm = this.alertCtrl.create({
			// 	title: 'Eliminar',
			// 	message: '¿Seguro que quieres eliminar la unidad?',
			// 	buttons: [
			// 	{
			// 		text: 'Cancelar',
			// 		handler: () => {
			// 			console.log('Disagree clicked');
			// 			this.showMenu = false;
			// 		}
			// 	},
			// 	{
			// 		text: 'Aceptar',
			// 		handler: () => {
			// 			console.log('Agree clicked');
			// 			this.showMenu = false;
			// 		}
			// 	}
			// 	]
			// });
			// confirm.present();
		}
	}

}
















