import { Router } from "express";
import { productModel } from "../models/products.model.js";
import { checkLogged, checkLogin, checkSession } from "../middlewares/auth.js";
import {
	addProduct,
	getPaginatedProducts,
	getProductById,
} from "../controllers/products.controller.js";
import {
	renderCartById,
	editProductQuantity,
	addProductToCart,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", checkLogin, getPaginatedProducts);

// router.post("/:cid/product/:pid", addProductToCart);

router.get("/realtimeproducts", async (req, res) => {
	const products = await productModel.find().lean();
	res.render("realTimeProducts", { products });
});

router.get("/product/:pid", getProductById);

// update product quantity in cart
router.put("/:cid", editProductQuantity);

router.get("/cart/:cid", renderCartById);

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
