import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import moment from 'moment';
import { Unit } from './../../../models/unit';
import { LocationService } from './../../../services/location.service';
import * as Constants from './../../../models/constants';
import { HttpService } from './../../../services/http.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
	selector: 'unit-component',
	templateUrl: 'unit.component.html'
})
export class UnitComponent implements OnInit {

	@Input() unit: Unit;
	private showMenu: boolean = false;

	constructor(private alertCtrl: AlertController, 
		private locationService: LocationService, 
		private http: HttpService,
		private loader: LoaderService,) {}

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

	private getStatus (date: Date) {
		var diffMS = moment(date).diff(moment());
		if (diffMS < 0) return 'unit-danger'; //Semana
		if (diffMS < 604800000) return 'unit-alert'; //Semana
		if (diffMS < 1209600000) return 'unit-good'; //14 dias
		return;
	}

	private saveDelete () {
		this.loader.addMessage("Borrando unidad");
		this.http.delete(Constants.UNIT, this.unit._id, Constants.PATHS.units.deleteUnit)
		.subscribe(validate => {
			this.loader.removeMessage("Borrando unidad");
		}, err => {
			this.loader.removeMessage("Borrando unidad");
		});
	}

	private delete (e) {
		e.stopPropagation();
		this.alertCtrl.create({
			message: `¿Quires eliminar la unidad?`,
			buttons: [
			{
				text: 'Cancelar',
				handler: () => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Aceptar',
				handler: () => {
					this.saveDelete();
				}
			}
			]
		}).present();
	}

}
















