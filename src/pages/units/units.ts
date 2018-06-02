import { Component, Injectable, Pipe, PipeTransform, OnInit } from '@angular/core';
import moment from 'moment';
import { Observable } from "rxjs/Observable";
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
export class UnitsPage implements OnInit {

	private isNew: boolean = false;
	private isEdit: boolean = false;
	private isDelete: boolean = false;
	private location: string;
	private expirationDate: string;
	private quantity: number = 0;
	private actionButton = {
		show: false,
		x: 0,
		y: 0
	}

	ngOnInit () {
		this.expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();
	}

	constructor(
		public navCtrl: NavController, 
		private memory: MemoryService,
		private http: HttpService,
		private loader: LoaderService,
		private locationService: LocationService
		) {
	}

	// private addOneYearToExpirationDate () {
	// 	this.expirationDate = new Date(new Date().setFullYear(new Date(this.expirationDate).getFullYear() + 1)).toISOString();
	// }

	private cancel () {
		this.isNew = false;
	}

	private getProductName () {
		var productId = this.getSelectedProduct();
		return this.memory.getValue(Constants.PRODUCT, productId).name;

	}

	private save () {
		this.loader.addMessage("Creando unidad");
		var expirationFormated = new Date(this.expirationDate);
		this.http.post(Constants.UNIT, Constants.PATHS.units.createUnit, new Unit(expirationFormated,this.location,this.getSelectedProduct(),this.quantity))
		.subscribe(unit => {
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

	private getLocations (): Observable<any[]> {
		return this.memory.get(Constants.LOCATION);
	}

	private getUnits (): Observable<any[]> {
		return this.memory.get(Constants.UNIT);
	}

	private getSelectedProduct () {
		return this.memory.getSelectedValue(Constants.PRODUCT);
	}

	private validate () {
		if (!this.location) return false;
		if (!this.expirationDate) return false;
		return true;
	}

}
















