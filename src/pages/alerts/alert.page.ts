import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemoryService } from './../../services/memory.service';
import { Observable } from "rxjs/Observable";
import * as Constants from './../../models/constants';

@Component({
	selector: 'page-alerts',
	templateUrl: 'alert.page.html'
})
export class AlertPage implements OnInit {

	private creatingNewAlert: boolean = false;

	constructor(
		private memory: MemoryService,
		public navCtrl: NavController
		) {}

	ngOnInit() { 
	}

	ionViewWillLeave () {
		this.creatingNewAlert = false;
	}

	private newAlert () {
		this.creatingNewAlert = true;
	}

	private closeNewAlert () {
		this.creatingNewAlert = false;
	}

	private getAlerts (): Observable<any> {
		return this.memory.get(Constants.ALERT);
	}

}



