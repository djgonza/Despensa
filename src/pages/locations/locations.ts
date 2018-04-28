import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

import * as Constants from './../../models/constants';
import { Locations } from './../../models/locations';

import { MemoryService } from './../../services/memory.service';
import { HttpService } from '../../services/http.service';
import { LoaderService } from '../../services/loader.service';

@Component({
	selector: 'page-locations',
	templateUrl: 'locations.html'
})
export class LocationsPage implements OnInit {

	private isNew: boolean = false;
	private name: string;

	constructor(
		public navCtrl: NavController,
		private memory: MemoryService,
		private http: HttpService,
		private loader: LoaderService
		) {}

	ngOnInit() { 
	}

	private getLocations (): Observable<any[]> {
		return this.memory.get(Constants.LOCATION);
	}

	private openCreateNewLocation () {
		this.isNew = true;
	}

	private closeCreateNewLocation () {
		this.loader.removeMessage("Creando ubicacion");
		this.isNew = false;
		this.name = null;
	}

	private create () {
		this.loader.addMessage("Creando ubicacion");
		this.http.post(Constants.LOCATION, Constants.PATHS.locations.createLocation, new Locations(this.name))
		.subscribe(product => {
			this.closeCreateNewLocation();
		}, err => {
			this.closeCreateNewLocation();
		});
	}

	private validate () {
		if (!this.name) return false;
		return true; 
	}


}



