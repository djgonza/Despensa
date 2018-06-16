import { Component, OnInit, Input } from '@angular/core';
import { MemoryService } from './../../services/memory.service';
import * as Constants from './../../models/constants';
import { Alert } from './../../models/alert';
import { AlertController } from 'ionic-angular';
import { LoaderService } from '../../services/loader.service';
import { HttpService } from './../../services/http.service';

@Component({
	selector: 'component-alert',
	templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit {

	@Input() alert: Alert;
	private showDetail: boolean = false;
	private isDeleting: boolean = false;

	constructor(
		private memory: MemoryService,
		private http: HttpService,
		private loader: LoaderService,
		private alertCtrl: AlertController
		) {}

	ngOnInit() { 
	}

	ionViewWillLeave () {
		this.showDetail = false;
		this.isDeleting = false;
	}

	private select (item) {
		this.showDetail = !this.showDetail;
	}

	private ondrag(item) {
		let percent = item.getSlidingPercent();
		if (Math.abs(percent) > 5 && !this.isDeleting) {
			this.delete(null);
			this.isDeleting = true;
		}
	}

	private saveDelete () {
		this.loader.addMessage("Borrando alerta");
		this.http.delete(Constants.ALERT, this.alert._id, Constants.PATHS.alerts.deleteAlerts)
		.subscribe(validate => {
			this.loader.removeMessage("Borrando alerta");
			this.isDeleting = false;
		}, err => {
			this.loader.removeMessage("Borrando alerta");
			this.isDeleting = false;
		});
	}

	private delete (e) {
		e ? e.stopPropagation() : null;
		this.alertCtrl.create({
			message: `¿Quires eliminar el aviso ${this.alert.title}?`,
			buttons: [
			{
				text: 'Cancelar',
				handler: () => {
					this.isDeleting = false;
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



