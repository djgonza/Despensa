import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyApp } from './app.component';

import { GlobalInterceptor } from './../interceptor/GlobalInterceptor';

import { AlertService } from './../services/alert.service';
import { MemoryService } from './../services/memory.service';
import { HttpService } from './../services/http.service';
import { ProductService } from './../services/product.service';
import { ArticleService } from './../services/article.service';
import { LocationService } from './../services/location.service';
import { ImageService } from './../services/image.services';
import { LoaderService } from './../services/loader.service';

import { AlertComponent } from './../components/alert/alert.component';
import { TabsPage } from '../pages/tabs/tabs';
import { Galery } from '../components/galery/galery';
import { CategoriesPage } from '../pages/categories/categories';
import { ProductsPage } from '../pages/products/products';
import { GaleryPage } from './../pages/galery/galery.page';
import { LoginPage } from '../pages/login/login';
import { UnitsPage, TimeToEnd } from '../pages/units/units';
import { LocationsPage } from '../pages/locations/locations';

import { OrderByDate } from '../pipes/orderByDate';
import { Filter } from '../pipes/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		AlertComponent,
		TabsPage,
		Galery,
		OrderByDate,
		Filter,
		TimeToEnd,
		LoginPage,
		UnitsPage,
		CategoriesPage,
		ProductsPage,
		GaleryPage,
		LocationsPage
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		TabsPage,
		CategoriesPage,
		ProductsPage,
		GaleryPage,
		LoginPage,
		UnitsPage,
		LocationsPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{
			provide: ErrorHandler, useClass: IonicErrorHandler
		},
		{ 
			provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true 
		},
		BarcodeScanner,
		Camera,
		AlertService,
		ImageService,
		MemoryService,
		HttpService,
		ProductService,
		ArticleService,
		LocationService,
		LoaderService
	]
})
export class AppModule {}
