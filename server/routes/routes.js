const router = require("express").Router();
const productController = require("../controllers/product.controller");
const userController = require("../controllers/user.controller");

router.route("/products")
    .get(productController.getAll);

router.route("/products/:productId")
    .get(productController.getById)
    .delete(productController.deleteById);

router.route("/auth")
    .post(userController.login);

module.exports = router;