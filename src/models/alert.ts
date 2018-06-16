export class Alert {

	public _id: string;
	public title: string;
	public description: string;
	public updateDate: Date;

	constructor (title: string, description:string, _id?:string, updateDate?: Date) {
		this.title = title;
		this.description = description;
		this._id = _id ? _id : null;
		this.updateDate = updateDate ? updateDate : null;
	}

}