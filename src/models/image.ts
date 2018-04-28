export class Image {

	public _id: string;
	public originalname: string;
	public encoding: string;
	public mimetype: string;
	public size: number;
	public bucket: string;
	public key: string;
	public acl: string;
	public contentType: string;
	public contentDisposition: string;
	public storageClass: string;
	public serverSideEncryption: string;
	public metadata: string;
	public location: string;
	public etag: string;
	public updateDate: Date;


	constructor (
		originalname: string, 
		encoding: string, 
		mimetype: string, 
		size: number,
		bucket: string,
		key: string,
		acl: string,
		contentType: string,
		contentDisposition: string,
		storageClass: string,
		serverSideEncryption: string,
		metadata: string,
		location: string,
		_id?: string,
		updateDate?: Date
	) {
		this.originalname = originalname; 
		this.encoding = encoding; 
		this.mimetype = mimetype; 
		this.size = size;
		this.bucket = bucket;
		this.key = key;
		this.acl = acl;
		this.contentType = contentType;
		this.contentDisposition = contentDisposition;
		this.storageClass = storageClass;
		this.serverSideEncryption = serverSideEncryption;
		this.metadata = metadata;
		this.location = location;
		this._id = _id ? _id : null;
		this.updateDate = updateDate ? updateDate : null;
	}

}