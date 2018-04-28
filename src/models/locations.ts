export class Locations {

	public _id: string;
	public name: string;
	public updateDate: Date;

	constructor (name: string, _id?:string, updateDate?: Date) {
		this.name = name;
		this._id = _id ? _id : null;
		this.updateDate = updateDate ? updateDate : null;
	}

}