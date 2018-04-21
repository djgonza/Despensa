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

import { AlertComponent } from './../components/alert/alert.component';
import { TabsPage } from '../pages/tabs/tabs';
import { GaleyPage } from '../pages/galery/galery';
import { ProductsPage } from '../pages/products/products';
// import { ArticulosPage, FilterByProducto, TimeToEnd } from '../pages/articulos/articulos';
import { AddProductPage } from '../pages/addProduct/addProduct';
// import { AddArticulo } from '../pages/addArticulo/addArticulo';
// import { AddUbicacion } from '../pages/addUbicacion/addUbicacion';
// import { SearchProductosPage } from '../pages/searchProducto/searchProducto';
import { LoginPage } from '../pages/login/login';

import { OrderByDate } from '../pipes/orderByDate';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		AlertComponent,
		TabsPage,
		GaleyPage,
		OrderByDate,
		LoginPage,
		ProductsPage,
		AddProductPage,
		// ArticulosPage,
		// AddArticulo,
		// AddUbicacion,
		// FilterByProducto,
		// TimeToEnd,
		// FilterByName,
		// SearchProductosPage
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
		GaleyPage,
		ProductsPage,
		AddProductPage,
		// ArticulosPage,
		// AddArticulo,
		// AddUbicacion,
		// SearchProductosPage,
		LoginPage
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
		MemoryService,
		HttpService,
		ProductService,
		ArticleService,
		LocationService
	]
})
export class AppModule {}
