import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderAlphabetically',
	pure: false
})

@Injectable()
export class OrderAlphabetically implements PipeTransform {
	transform(items: any[], field: string): any[] {
		if (!items) return [];
		return items.sort((a,b) => {
			if(a[field] < b[field]) return -1;
			if(a[field] > b[field]) return 1;
			return 0;
		});
	}
}