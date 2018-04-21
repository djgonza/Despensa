import { Component } from '@angular/core';
import { ProductsPage } from '../products/products';
// import { AddUbicacion } from '../addUbicacion/addUbicacion';
// import { SearchProductosPage } from '../searchProducto/searchProducto';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProductsPage;
  // tab2Root = SearchProductosPage;
  // tab3Root = AddUbicacion;

  constructor() {

  }
}
