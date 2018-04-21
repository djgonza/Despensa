import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { MemoryService } from './memory.service';

@Injectable()
export class LocationService {

	constructor (
		private http: HttpService, 
		private memory: MemoryService) {}

	public addLocation (location: object): void {

	}

	public getLocations (): void {

	}

	public updateLocation (locationId: string, fields: object): void {

	}

	public deleteLocation (locationId: string): void {

	}

}