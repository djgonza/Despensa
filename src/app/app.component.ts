import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppMemoriaService } from './../services/memoria.service';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = TabsPage;

	constructor(
		private platform: Platform, 
		private statusBar: StatusBar, 
		private splashScreen: SplashScreen,
		private appMemoriaService: AppMemoriaService
	) {
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
			this.appMemoriaService.init();
		});
	}
}
