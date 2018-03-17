import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppMemoriaService } from './../../services/memoria.service';

@Component({
	selector: 'page-productos',
	templateUrl: 'productos.html'
})
export class ProductosPage implements OnInit {

	constructor(public navCtrl: NavController, private appMemoriaService: AppMemoriaService) {

	}

	ngOnInit() { 
        this.appMemoriaService.loadProductos();
    }

}
