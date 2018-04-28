export class Product {

	public _id: string;
	public name: string;
	public code: string;
	public category: string;
	public image: string;
	public updateDate: Date;

	constructor (name: string, code: string, category: string, _id?:string, image?: string, updateDate?: Date) {
		this.name = name;
		this.code = code;
		this.category = category;
		this._id = _id ? _id : null;
		this.image = image ? image : null;
		this.updateDate = updateDate ? updateDate : null;
	}

}

