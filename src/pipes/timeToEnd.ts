import { Injectable, Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
		name: 'timeToEnd'
	})

	@Injectable()
	export class TimeToEnd implements PipeTransform {
		transform(date: string): string {

			var diffMS = moment(date).diff(moment());
			var toDate = moment.duration(diffMS);

			var years = toDate.years();
			var months = toDate.months();
			var days = toDate.days();

			if (years > 0) {
				return `${toDate.years()} años ${toDate.months()} meses ${toDate.days()} dias`;
			}

			if (months > 0) {
				return `${toDate.months()} meses ${toDate.days()} dias`;
			}

			if (days > 0) {
				return `${toDate.days()} dias`;
			}

			if (days == 0) {
				return "Caduca Hoy";
			} 

			return "Caducado";

		}

	}