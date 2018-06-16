import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MemoryService } from './../../services/memory.service';
import { HttpService } from './../../services/http.service';
import { LoaderService } from '../../services/loader.service';

import * as Constants from './../../models/constants';

@Component({
	selector: 'component-create-alert',
	templateUrl: 'create-alert.component.html'
})
export class CreateAlertComponent implements OnInit {

	@Input() title: string;
	@Input() description: string;
	@Output() close = new EventEmitter<boolean>();

	constructor(
		private memory: MemoryService,
		private http: HttpService,
		private loader: LoaderService
		) {}

	ngOnInit() { 
	}

	private cancel () {
		this.close.emit(true);
	}

	private create () {
		this.loader.addMessage("Creando Alerta");
		this.http.post(Constants.ALERT, Constants.PATHS.alerts.createAlerts, {
			title: this.title,
			description: this.description
		}).subscribe(alert => {
			this.loader.removeMessage("Creando Alerta");
			this.close.emit(true);
		}, err => {
			this.loader.removeMessage("Creando Alerta");
			this.close.emit(true);
		});
	}

	private validate () {
		if (!this.title) return false
		if (!this.description) return false
		return true
	}

}



