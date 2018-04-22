import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from "rxjs/Observable";
import { ImageService } from './../../services/image.services';
import { MemoryService } from './../../services/memory.service';
import { LoadingController } from 'ionic-angular';

@Component({
	selector: 'galery',
	templateUrl: 'galery.html'
})
export class Galery implements OnInit {

	private imageToUpload: string;
	@Output() selectedImage = new EventEmitter<object>();
	private loader;

	constructor(
		public navCtrl: NavController,
		private camera: Camera,
		private imageService: ImageService,
		private memoryService: MemoryService,
		private loadingController: LoadingController
		) {
	}

	ngOnInit() { 
	}

	private fileChange(e) {
		console.log(e);
	}

	private openLoader () {
		this.loader = this.loadingController.create({
			content: '<div class="loader-subiendo-imagen">Subiendo Imagen</div>'
		});
		this.loader.present();
	}

	private closeLoader () {
		this.loader.dismiss();
		this.loader = null;
	}

	private selectImage(image: object) {
		this.selectedImage.emit(image);
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















