import { Component } from '@angular/core';
import { ProductosPage } from '../productos/productos';
import { AddUbicacion } from '../addUbicacion/addUbicacion';
import { SearchProductosPage } from '../searchProducto/searchProducto';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProductosPage;
  tab2Root = SearchProductosPage;
  tab3Root = AddUbicacion;

  constructor() {

  }
}
