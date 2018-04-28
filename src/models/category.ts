export class Category {

	public _id: string;
	public name: string;
	public image: string;
	public updateDate: Date;

	constructor (name: string, _id?:string, image?: string, updateDate?: Date) {
		this.name = name;
		this._id = _id ? _id : null;
		this.image = image ? image : null;
		this.updateDate = updateDate ? updateDate : null;
	}

	public getName (): string {
		return this.name;
	}
	public getImage (): string {
		return this.image;
	}

}