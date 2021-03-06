import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from "rxjs/Observable";
import { ImageService } from './../../services/image.services';
import { MemoryService } from './../../services/memory.service';
import { LoaderService } from './../../services/loader.service';
import * as Constants from './../../models/constants';
import { Image } from './../../models/image';

@Component({
	selector: 'galery',
	templateUrl: 'galery.html'
})
export class Galery implements OnInit {

	
	@Output() selectedImage = new EventEmitter<object>();
	@Output() closeGalery = new EventEmitter<boolean>();
	@Input() btnClose = false;
	private imageToUpload: string;

	constructor(
		public navCtrl: NavController,
		private camera: Camera,
		private imageService: ImageService,
		private memory: MemoryService,
		private loader: LoaderService,
		private params: NavParams,
		private viewCtrl: ViewController
		) {

		if (params.get('btnClose')) {
			this.btnClose = true;
		}

	}

	ngOnInit() { 
	}

	private fileChange(e) {
		if (e.target.files.length == 0) return;
		this.saveImage(e.target.files[0]);
	}

	private getImages () {
		return this.memory.get(Constants.IMAGE);
	}

	private openLoader () {
		this.loader.addMessage("Subiendo Imagen");
	}

	private closeLoader () {
		this.loader.removeMessage("Subiendo Imagen");
	}

	private selectImage(image: Image) {
		this.memory.addSelect(image, Constants.IMAGE);
		this.selectedImage.emit(image);
		this.close();
	}

	private close () {
		this.viewCtrl.dismiss();
		this.closeGalery.emit(true);
	}

	private addImage () {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			saveToPhotoAlbum: true,
			allowEdit: true,
			sourceType: 1 //Solo imagenes
		}

		this.camera.getPicture(options).then((imageData) => {
			this.openLoader();
			//console.log(imageData);
			this.imageToUpload = imageData;
			this.imageService.addImage(this.b64toBlob(imageData, 'image/jpeg', 512))
			.subscribe(res => {
				this.closeLoader();
			}, err => {
				this.closeLoader();
			});
		}, (err) => {
			console.log(err);
		});
	}

	private saveImage (image) {
		this.openLoader();
		this.imageService.addImage(image)
		.subscribe(res => {
			console.log(res);
			this.closeLoader();
		}, err => {
			console.log(err);
			this.closeLoader();
		});
	}

	private b64toBlob(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, {type: contentType});
		return blob;
	}

}















