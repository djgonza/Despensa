import { Component, Input } from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
//import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';

import { HttpService } from './../../services/http.service';
import { AlertService } from './../../services/alert.service';
import { MemoryService } from './../../services/memory.service';

import { TabsPage } from './../tabs/tabs';
import { environment } from './../../environment/environment';
import { Product } from './../../models/product';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	//TODO: fingerPrint y sistema para recordar usuarios

	@Input() name: string = "Fran";
	@Input() secret: string = "fran";
	private showError: boolean = false;
	private className: string = '';
	private err: string = null;

	constructor(
		public navCtrl: NavController,
		private http: HttpService,
		private alertService: AlertService,
		private memory: MemoryService,
		//private androidFingerprintAuth: AndroidFingerprintAuth
		) {
	}

	ionViewDidEnter () {
		this.className = '';
		this.err = null;
		this.memory.clearMemory();

	}
	
	private loginByFinger () {
		// this.androidFingerprintAuth.isAvailable()
		// .then((result)=> {
		// 	if(result.isAvailable){

		// 		this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
		// 		.then(result => {
		// 			if (result.withFingerprint) {
		// 				alert('Successfully encrypted credentials.');
		// 				alert('Encrypted credentials: ' + result.token);
		// 			} else if (result.withBackup) {
		// 				alert('Successfully authenticated with backup password!');
		// 			} else alert('Didn\'t authenticate!');
		// 		})
		// 		.catch(error => {
		// 			if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
		// 				console.log('Fingerprint authentication cancelled');
		// 			} else console.error(error)
		// 		});

		// 	} else {
		// 	}
		// })
		// .catch(error => console.error(error));
	}

	private login () {
		this.className = 'accediendo';
		this.http.getRefreshToken({
			name: this.name,
			secret: this.secret
		}).subscribe(res => {
			//this.alertService.addMessage('Bienvenido');
			this.navCtrl.push(TabsPage);
		}, err => {
			this.className = '';
			this.err = "El nombre o la contraseña no son correctos";
			console.log(err);
		});
	}

}















