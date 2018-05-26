import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MemoryService } from './../../services/memory.service';
import * as Constants from './../../models/constants';
import { Galery } from './../../components/galery/galery';

@Component({
	selector: 'page-categories',
	templateUrl: 'categories.page.html'
})
export class CategoriesPage implements OnInit {

	private searchFilterValue: string = '';
	private showNewCategory: boolean = false;
	private orderAlphabeticallyDirection: boolean = false;

	constructor(
		private memory: MemoryService,
		public modalCtrl: ModalController,
		public navCtrl: NavController
		) {}

	ngOnInit() { 
		//console.log(this.navCtrl);
	}

	private orderAlphabetically() {
		this.orderAlphabeticallyDirection = !this.orderAlphabeticallyDirection;
	}

	private searchFilter (e) {
		this.searchFilterValue = e.target.value;
	}

	private getCategories () {
		return this.memory.get(Constants.CATEGORY);
	}

	private openGalery () {
		this.modalCtrl.create(Galery, { btnClose: true }).present();
	}

	private openCreateNewCategory () {
		this.memory.addSelect(null, Constants.IMAGE);
		this.showNewCategory = true;
	}

	private closeCreateNewCategory (e) {
		this.showNewCategory = false;
	}

}



