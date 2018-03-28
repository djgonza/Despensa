import { Component } from '@angular/core';
import { ProductosPage } from '../productos/productos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProductosPage;
  tab2Root = ProductosPage;

  constructor() {

  }
}
