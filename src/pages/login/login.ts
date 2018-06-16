import { Component, Input } from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

import { HttpService } from './../../services/http.service';
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
		private memory: MemoryService
		) {
	}

	ionViewDidEnter () {
		this.className = '';
		this.err = null;
		this.memory.clearMemory();

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















