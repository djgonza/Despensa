import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProductosPage } from '../productos/productos';
import { AddProductosPage } from '../addProducto/addProducto';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProductosPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = AddProductosPage;

  constructor() {

  }
}
