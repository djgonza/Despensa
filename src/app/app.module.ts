import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { AppMemoriaService } from './../services/memoria.service';
import { HttpService } from './../services/http.service';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProductosPage } from '../pages/productos/productos';
import { ModalArticulos } from '../pages/modalArticulos/modalArticulos';
import { AddProductosPage } from '../pages/addProducto/addProducto';
import { AddArticulo } from '../pages/addArticulo/addArticulo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductosPage,
    AddProductosPage,
    ModalArticulos,
    AddArticulo
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductosPage,
    AddProductosPage,
    ModalArticulos,
    AddArticulo
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Camera,
    AppMemoriaService,
    HttpService
  ]
})
export class AppModule {}
