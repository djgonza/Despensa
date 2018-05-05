import { Component, OnInit, Pipe, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operators';

import { MemoryService } from './../../services/memory.service';
import { LoaderService } from '../../services/loader.service';
import { HttpService } from './../../services/http.service';

import * as Constants from './../../models/constants';
import { Image } from './../../models/image';
import { ProductsPage } from './../products/products';

@Component({
	selector: 'new-category',
	templateUrl: 'new.category.component.html'
})
export class NewCategoryComponent implements OnInit {

	@Output() close = new EventEmitter<boolean>();
	@Output() openGalery = new EventEmitter<boolean>();
	@Input() name: string;

	constructor(
		private memory: MemoryService,
		private http: HttpService,
		private loader: LoaderService
		) {}

	ngOnInit() { 
		
	}

	private getImage (): Observable<any> {
		return this.memory.getSelect(Constants.IMAGE)
		.pipe(
			map((image: Image)=> {
				if (image) return image.location;
				return 'http://via.placeholder.com/1000x1000';	
			})
		);
	}

	private selectImage () {
		this.openGalery.emit(true);
	}

	private validate () {
		if (!this.name) return false;
		return true;
	}

	private cancel () {
		this.close.emit(true);
	}

	private create () {
		this.loader.addMessage("Creando Categoria");
		var image = this.memory.getSelectedValue(Constants.IMAGE);
		this.http.post(Constants.CATEGORY, Constants.PATHS.categories.createCategory, {
			name: this.name,
			image: image ? image._id : null
		}).subscribe(category => {
			this.loader.removeMessage("Creando Categoria");
			this.close.emit(true);
		}, err => {
			this.loader.removeMessage("Creando Categoria");
			this.close.emit(true);
		});
	}

}



