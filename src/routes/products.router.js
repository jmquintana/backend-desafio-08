// import ProductManager from "../managers/ProductManager.js";
import { Router } from "express";
import { uploader } from "../utils.js";
import socket from "../socket.js";
import { productModel } from "../models/products.model.js";
import {
	getProducts,
	getProductById,
	addProduct,
	addManyProducts,
	updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/", uploader.array("thumbnails", 10), addProduct);

router.post("/many", addManyProducts);

router.put("/:pid", updateProduct);

router.delete("/:pid", async (req, res) => {
	try {
		const productId = req.params.pid;
		const result = await productModel.deleteOne({ _id: productId });
		socket.io.emit("product_deleted", productId);
		res.send({ status: "Success", payload: result });
	} catch (error) {
		console.log(error);
	}
});

export default router;
