export class Unit {

	public _id: string;
	public expirationDate: Date;
	public location: string;
	public product: string;
	public quantity: number;
	public updateDate: Date;

	constructor (expirationDate: Date, location: string, product: string, quantity: number, _id?:string, updateDate?: Date) {
		this.expirationDate = expirationDate;
		this.location = location;
		this.product = product;
		this.quantity = quantity;
		this._id = _id ? _id : null;
		this.updateDate = updateDate ? updateDate : null;
	}

}
