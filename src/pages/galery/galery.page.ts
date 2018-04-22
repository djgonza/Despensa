import { Component, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Galery } from './../../components/galery/galery';


@Component({
	selector: 'galery-page',
	templateUrl: 'galery.page.html'
})
export class GaleryPage {

	constructor(
		public navCtrl: NavController) {}

}
