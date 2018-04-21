import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	
	rootPage:any = LoginPage;

	constructor(
		private platform: Platform, 
		private statusBar: StatusBar, 
		private splashScreen: SplashScreen
	) {
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}
}
