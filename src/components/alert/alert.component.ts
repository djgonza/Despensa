import { Component } from '@angular/core';
import { AlertService } from './../../services/alert.service';

@Component({
	selector: 'alert-component',
	templateUrl: 'alert.component.html'
})
export class AlertComponent {

	constructor(private alertService: AlertService) {}

}