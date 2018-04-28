import { Injectable } from "@angular/core";
import { tap, map } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { HttpService } from './http.service';
import { MemoryService } from './memory.service';
import * as Constants from './../models/constants';

@Injectable()
export class ImageService {

	constructor (
		private http: HttpService, 
		private memory: MemoryService) {}

	public getImageLocation (imageId: string): string {
		if (!imageId) return "http://via.placeholder.com/1000x1000";
		var images = this.memory.getValues(Constants.IMAGE);
		var imageToReturn = images.find(image => {
			return image._id == imageId;
		});
		if (!imageToReturn) return "http://via.placeholder.com/1000x1000";
		return imageToReturn.location;
	}

	public addImage (image: Blob): Observable<object> {

		let formData:FormData = new FormData();
		formData.append('image', image, "image");

		return this.http.post(Constants.IMAGE, Constants.PATHS.images.createImage, formData)
		.pipe(
			tap(res => {
				this.memory.add(Constants.IMAGE, res);
			})
		);
	}
}