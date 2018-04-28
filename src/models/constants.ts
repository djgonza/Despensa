import { environment } from './../environment/environment';

export const PRODUCT = 'product';
export const CATEGORY = 'category';
export const UNIT = 'unit';
export const LOCATION = 'location';
export const IMAGE = 'image';

export const PATHS = {
	categories: {
		getCategories: environment.despensaRestApi + '/categories/load',
		createCategory: environment.despensaRestApi + '/categories/create',
		updateCategory: environment.despensaRestApi + '/categories/update',
		deleteCategory: environment.despensaRestApi + '/categories/delete',
	},
	products: {
		getProducts: environment.despensaRestApi + '/products/load',
		createProduct: environment.despensaRestApi + '/products/create',
		updateProduct: environment.despensaRestApi + '/products/update',
		deleteProduct: environment.despensaRestApi + '/products/delete',
	},
	locations: {
		getLocations: environment.despensaRestApi + '/locations/load',
		createLocation: environment.despensaRestApi + '/locations/create',
		updateLocation: environment.despensaRestApi + '/locations/update',
		deleteLocation: environment.despensaRestApi + '/locations/delete',
	},
	units: {
		getUnits: environment.despensaRestApi + '/units/load',
		createUnit: environment.despensaRestApi + '/units/create',
		updateUnit: environment.despensaRestApi + '/units/update',
		deleteUnit: environment.despensaRestApi + '/units/delete',
	},
	images: {
		getImages: environment.imagesApi + '/images/load',
		createImage: environment.imagesApi + '/images/create',
		updateImage: environment.imagesApi + '/images/update',
		deleteImage: environment.imagesApi + '/images/delete',
	}
}