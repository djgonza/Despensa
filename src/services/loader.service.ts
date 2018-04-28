import { Injectable } from "@angular/core";
import { LoadingController } from 'ionic-angular';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LoaderService {

	private messages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(new Array());
	private loader;

	constructor (private loadingCtrl: LoadingController) {
	}

	public addMessage (message: string) {
		var messages = this.messages.getValue();
		messages.push(message);
		this.messages.next(messages);
		this.presentLoader();
	}

	public removeMessage (inputMessage: string) {
		var messages = this.messages.getValue();
		messages = messages.filter(message => {
			return message != inputMessage;
		});
		this.messages.next(messages);
		if (messages.length == 0) {
			this.hideLoader();
		}else{
			this.changeLoaderContent ();
		}
		
	}

	private presentLoader () {
		if (!this.loader) {
			this.loader = this.loadingCtrl.create({});
		}
		this.changeLoaderContent ();
		this.loader.present();
	}

	private hideLoader () {
		this.loader.dismiss();
		this.loader = null;
	}

	private changeLoaderContent () {
		var messagesHtml = '';
		this.messages.getValue().forEach(message => {
			messagesHtml += `<div class='loader-item'>${message}</div>`;
		});
		this.loader.data.content = `<div>${messagesHtml}</div>`;
	}

}