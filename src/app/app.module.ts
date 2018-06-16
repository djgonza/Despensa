import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyApp } from './app.component';

import { GlobalInterceptor } from './../interceptor/GlobalInterceptor';

import { MemoryService } from './../services/memory.service';
import { HttpService } from './../services/http.service';
import { LocationService } from './../services/location.service';
import { ImageService } from './../services/image.services';
import { LoaderService } from './../services/loader.service';

import { TabsPage } from '../pages/tabs/tabs';
import { Galery } from '../components/galery/galery';

import { GaleryPage } from './../pages/galery/galery.page';
import { LoginPage } from '../pages/login/login';
import { LocationsPage } from '../pages/locations/locations';
import { SeekerPage } from '../pages/seeker/seeker.page';

import { CategoriesPage } from '../pages/categories/categories.page';
import { CategoryComponent } from '../pages/categories/category.component';
import { NewCategoryComponent } from '../pages/categories/new.category.component';

import { ProductsPage } from '../pages/products/products';
import { ProductComponent } from '../pages/products/components/product.component';
import { NewProductComponent } from '../pages/products/components/new.product.component';

import { UnitsPage } from '../pages/units/units';
import { UnitComponent } from './../pages/units/components/unit.component';

import { AlertPage } from '../pages/alerts/alert.page';
import { AlertComponent } from '../pages/alerts/alert.component';
import { CreateAlertComponent } from '../pages/alerts/create-alert.component';

import { OrderByDate } from '../pipes/orderByDate';
import { Filter } from '../pipes/filter';
import { TimeToEnd } from '../pipes/timeToEnd';
import { OrderAlphabetically } from '../pipes/orderAlphabetically';
import { OrderAlphabeticallyReverse } from '../pipes/orderAlphabeticallyReverse';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		UnitComponent,
		AlertComponent,
		CreateAlertComponent,
		CategoryComponent,
		NewCategoryComponent,
		ProductComponent,
		NewProductComponent,
		TabsPage,
		Galery,
		OrderByDate,
		Filter,
		TimeToEnd,
		OrderAlphabetically,
		OrderAlphabeticallyReverse,
		LoginPage,
		UnitsPage,
		AlertPage,
		CategoriesPage,
		ProductsPage,
		GaleryPage,
		SeekerPage,
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
		SeekerPage,
		LoginPage,
		UnitsPage,
		AlertPage,
		LocationsPage,
		Galery
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
		ImageService,
		MemoryService,
		HttpService,
		LocationService,
		LoaderService
	]
})
export class AppModule {}
