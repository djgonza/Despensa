import { Component, Input } from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

import { HttpService } from './../../services/http.service';
import { AlertService } from './../../services/alert.service';

import { TabsPage } from './../tabs/tabs';

import { environment } from './../../environment/environment';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { Product } from './../../models/product';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	//TODO: fingerPrint y sistema para recordar usuarios

	@Input() name: string;// = "David";
	@Input() secret: string;// = "123";
	private showError: boolean = false;
	private className: string = '';
	private imageToUpload;

	constructor(
		public navCtrl: NavController,
		private http: HttpService,
		private alertService: AlertService,
		private camera: Camera
		) {
	}
	
	private login () {
		this.className = 'accediendo';
		this.http.getRefreshToken({
			name: this.name,
			secret: this.secret
		}).subscribe(res => {
			this.alertService.addMessage('Bienvenido');
			this.navCtrl.push(TabsPage);
		});
	}

}















