import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AlertService {

	private _messages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	private interval;

	constructor () {}

	public addMessage (message: string): void {
		var messages = this._messages.getValue();
		messages.push(message);
		this._messages.next(messages);
		if (!this.interval){
			this.interval = setInterval(() => {
				this.shiftMessage();
			}, 3000);
		}
	}

	private shiftMessage () {
		var messages = this._messages.getValue();
		if (messages.length > 0) {
			messages.shift();
			this._messages.next(messages);
		}else{
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	public getMessages (): Observable<string[]> {
		return this._messages.asObservable();
	}

}