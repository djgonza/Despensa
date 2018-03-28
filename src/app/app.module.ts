import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { AppMemoriaService } from './../services/memoria.service';
import { HttpService } from './../services/http.service';
import { ProductosService } from './../services/productos.service';
import { ArticulosService } from './../services/articulos.service';

import { TabsPage } from '../pages/tabs/tabs';
import { ProductosPage, FilterByName } from '../pages/productos/productos';
import { ArticulosPage, FilterByProducto, TimeToEnd } from '../pages/articulos/articulos';
import { AddProductosPage } from '../pages/addProducto/addProducto';
import { AddArticulo } from '../pages/addArticulo/addArticulo';

import { OrderByDate } from '../pipes/orderByDate';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ProductosPage,
    AddProductosPage,
    ArticulosPage,
    AddArticulo,
    FilterByProducto,
    OrderByDate,
    TimeToEnd,
    FilterByName
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
    ProductosPage,
    AddProductosPage,
    ArticulosPage,
    AddArticulo
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Camera,
    AppMemoriaService,
    HttpService,
    ProductosService,
    ArticulosService
  ]
})
export class AppModule {}
