import { Injectable } from "@angular/core";
import { tap, map } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { HttpService } from './http.service';
import { MemoryService } from './memory.service';
import { environment } from './../environment/environment';

@Injectable()
export class ImageService {

	constructor (
		private http: HttpService, 
		private memory: MemoryService) {}

	public addImage (image: Blob): Observable<object> {

		let formData:FormData = new FormData();
		formData.append('image', image, "image");

		return this.http.post(environment.imagesApi + '/uploadImage', formData)
		.pipe(
			tap(res => {
				this.memory.add(res, 'images');
			})
		);
	}

	public getImages (): Observable<object[]> {
		return this.http.get(environment.imagesApi + '/getAllByUser')
		.pipe(
			tap(res => {
			this.memory.addMultiple(res, 'images');
		}));
	}

	public updateImage (imageId: string, fields: object): void {

	}

	public deleteImage (imageId: string): void {

	}

}