import { Router } from "express";
import { productModel } from "../models/products.model.js";
import { checkLogged, checkLogin, checkSession } from "../middlewares/auth.js";
import {
	getPaginatedProducts,
	getProductById,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", checkLogin, getPaginatedProducts);

router.post("/:cid/product/:pid", async (req, res) => {
	const cartId = req.params.cid;
	const productId = req.params.pid;
	const result = await cartsManager.addProductToCart(productId, cartId);
	res.render("carts", { status: "Success", result });
});

router.get("/realtimeproducts", async (req, res) => {
	const products = await productModel.find().lean();
	res.render("realTimeProducts", { products });
});

router.get("/product/:pid", getProductById);

// update product quantity in cart
router.put("/:cid", async (req, res) => {
	const cartId = req.params.cid;
	const productId = req.body.productId;
	const newQuantity = req.body.newQuantity;
	const result = await cartsManager.editProductQuantity(
		productId,
		cartId,
		newQuantity
	);
	res.send({ status: "Success", result });
});

router.get("/cart/:cid", async (req, res) => {
	const cartId = req.params.cid;
	// const carts = carts[0];
	const cart = await cartsManager.getCartById(cartId);
	if (cart) {
		const cartIsEmpty = !cart.products?.length;
		const { products } = cart;

		// Calculate sub total price of each product
		products.forEach((product) => {
			product.subTotal = product.product.price * product.quantity;
		});
		// Calculate total price of all products
		const totalPrice = products.reduce((acc, product) => {
			return acc + parseFloat(product.subTotal);
		}, 0);
		res.render("cart", { cart, cartId, cartIsEmpty, products, totalPrice });
	}
});

router.get("/register", checkLogged, (req, res) => {
	res.render("register");
});

router.get("/login", checkSession, (req, res) => {
	res.render("login");
});

router.get("/profile", checkLogin, (req, res) => {
	res.render("profile", { user: req.session.user });
});

router.get("/restore", (req, res) => {
	res.render("restore");
});

export default router;
