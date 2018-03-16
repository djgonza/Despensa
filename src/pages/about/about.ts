import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {

	constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {

	}

	onClickMe () {
		this.barcodeScanner.scan().then((barcodeData) => {
 			// Success! Barcode data is here
 			console.log(barcodeData);
 			alert(barcodeData.text);
		}, (err) => {
    		// An error occurred
		});
	}

}
