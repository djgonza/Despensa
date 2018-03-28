import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderByDate',
	pure: false
})

@Injectable()
export class OrderByDate implements PipeTransform {
	transform(items: any[], field: string): any[] {
		if (!items) return [];
		return items.sort((a,b) => {
			var dateA = new Date(a[field]);
			var dateB = new Date(b[field]);
			if (dateA > dateB) return 1;
			if (dateA < dateB) return -1;
			return 0;
		});
	}
}