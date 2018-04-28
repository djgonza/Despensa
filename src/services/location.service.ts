import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { MemoryService } from './memory.service';
import * as Constants from './../models/constants';

@Injectable()
export class LocationService {

	constructor (
		private http: HttpService, 
		private memory: MemoryService) {}

	public getLocationById (locationId: string): object {
		return this.memory.getValues(Constants.LOCATION).find(location => {
			return location._id == locationId;
		});
	}


}