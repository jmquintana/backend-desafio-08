import { productModel } from "../models/products.model.js";

class ProductsRepository {
	constructor() {}

	getProducts = async (limit, page, category, status, sort) => {
		try {
			limit = parseInt(limit) || 5;
			page = parseInt(page) || 1;
			let products = await productModel.paginate(
				{},
				{
					limit,
					page,
					lean: true,
				}
			);

			return products;
		} catch (error) {
			console.log(error);
		}
	};

	getPaginatedProducts = async (filters, options) => {
		try {
			const result = await productModel.paginate(filters, options);
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	addProduct = async (product) => {
		try {
			const result = await productModel.create(product);
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	getProductById = async (productId) => {
		try {
			const result = await productModel.find({ _id: productId }).lean();
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	addManyProducts = async (arrOfProducts) => {
		try {
			const result = await productModel.insertMany(arrOfProducts);
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	updateProduct = async (productId, changes) => {
		try {
			const result = await productModel.updateOne({ _id: productId }, changes);
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	deleteProduct = async (productId) => {};
}

export const productsRepository = new ProductsRepository();
