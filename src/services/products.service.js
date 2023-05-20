import { productsRepository } from "../repositories/products.repository.js";

class ProductsService {
	constructor() {}

	getProducts(limit, page, category, status, sort) {
		const products = productsRepository.getProducts(
			limit,
			page,
			category,
			status,
			sort
		);
		return products;
	}

	getPaginatedProducts = async (filters, options) => {
		const result = await productsRepository.getPaginatedProducts(
			filters,
			options
		);
		return result;
	};

	addProduct(product, files) {
		product.thumbnails = [];

		if (files) {
			files.forEach((file) => {
				const imageUrl = `http://localhost:3000/images/${file.filename}`;
				product.thumbnails.push(imageUrl);
			});
		}
		const result = productsRepository.addProduct(product);

		return result;
	}

	getProductById(productId) {
		const result = productsRepository.getProductById(productId);
		return result;
	}

	addManyProducts(arrOfProducts) {
		const result = productsRepository.addManyProducts(arrOfProducts);
		return result;
	}

	updateProduct(productId, changes) {
		const result = productsRepository.updateProduct(productId, changes);
		return result;
	}

	deleteProduct(productId) {}
}

export const productsService = new ProductsService();
