import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
	name: 'filter',
	pure: false
})

@Injectable()
export class Filter implements PipeTransform {
	transform(items: any[], field: string, value: string): any[] {
		if (!items) return [];
		if (!value || value.trim() == '') return items;
		return items.filter(it => {
			if (!it[field]) return false;
			return it[field].toLowerCase().includes(value.toLowerCase())
		});
	}
}