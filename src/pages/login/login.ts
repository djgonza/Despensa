import { Component, Input } from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

import { HttpService } from './../../services/http.service';
import { ProductService } from './../../services/product.service';
import { AlertService } from './../../services/alert.service';

import { TabsPage } from './../tabs/tabs';

import { environment } from './../../environment/environment';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	@Input() name: string = "David";
	@Input() secret: string = "123";
	private showError: boolean = false;
	private className: string = '';
	private imageToUpload;

	constructor(
		public navCtrl: NavController,
		private http: HttpService,
		private productService: ProductService,
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

	private createProduct () {
		var product = {
			name: "Producto de prueba",
			code: "Codigo de prueba",
			description: "La descripcion"
		}
		this.productService.addProduct(product)
		.subscribe(product => {
			console.log('addProduct', product);
		});
	}

	private updateProduct () {
		var product = {
			id: "",
			name: "Producto de prueba editado",
			code: "Codigo de prueba editado",
			description: "La descripcion editada"
		}
		this.productService.updateProduct(product.id, product)
		.subscribe(product => {
			console.log('updateProduct', product);
		});
	}

	private getProducts () {
		this.productService.getProducts()
		.subscribe(products => {
			console.log('getProducts', products);
		}, err => {
			console.log(err);
		});
	}

	private deleteProduct () {
		//TODO: leyendo = true
		this.productService.deleteProduct('')
		.subscribe(product => {
			console.log('deleteProduct', product);
		}, err => {
			//TODO: leyendo = false y llama a mensaje service
			console.log(err);
		});
	}

	private addImage () {
		console.log(this.camera);
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,//this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			saveToPhotoAlbum: true,
			allowEdit: true,
			sourceType: 1 //Solo imagenes
		}

		this.camera.getPicture(options).then((imageData) => {
			console.log(imageData);
			alert(imageData);
			this.imageToUpload = imageData;
		}, (err) => {
			console.log(err);
		});
	}

}















