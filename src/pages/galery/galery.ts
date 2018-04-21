import { Component, Input } from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from "rxjs/Observable";

@Component({
	selector: 'page-galery',
	templateUrl: 'galery.html'
})
export class GaleyPage {

	private imageToUpload: string;

	constructor(
		public navCtrl: NavController,
		private camera: Camera
		) {
	}

	private fileChange(e) {
		console.log(e);
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
			this.imageToUpload = imageData;
		}, (err) => {
			console.log(err);
		});
	}

}















