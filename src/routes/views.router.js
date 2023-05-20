import { Router } from "express";
import { checkLogged, checkLogin, checkSession } from "../middlewares/auth.js";
import {
	getPaginatedProducts,
	getProductById,
} from "../controllers/products.controller.js";
import {
	renderCartById,
	editProductQuantity,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", checkLogin, getPaginatedProducts);

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
