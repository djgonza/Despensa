import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { MemoryService } from './memory.service';

@Injectable()
export class ImageService {

	constructor (
		private http: HttpService, 
		private memory: MemoryService) {}

	public addImages (image: object): void {
		// let file: File = fileList[0];
  //       let formData:FormData = new FormData();
  //       formData.append('uploadFile', file, file.name);
  //       let headers = new Headers();
  //       /** In Angular 5, including the header Content-Type can invalidate your request */
  //       headers.append('Content-Type', 'multipart/form-data');
  //       headers.append('Accept', 'application/json');
  //       let options = new RequestOptions({ headers: headers });
  //       this.http.post(`${this.apiEndPoint}`, formData, options)
  //           .map(res => res.json())
  //           .catch(error => Observable.throw(error))
  //           .subscribe(
  //               data => console.log('success'),
  //               error => console.log(error)
  //           )
	}

	public getImages (): void {

	}

	public updateImage (imageId: string, fields: object): void {

	}

	public deleteImage (imageId: string): void {

	}

}