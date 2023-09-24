const Product = require("../models/product.model");
let status = 200;
let message = {};

const getAll = function(req, res) {
    res.status(200).json(Product.getAll());
}

const getById = function(req, res) {
    const productId = req.params.productId;
    const product = Product.getById(productId);
    if (product) {
        status = 200;
        message = product;
    } else {
        status = 404;
        message = {
            message: "No product found with ID " + productId
        }
    }
    res.status(status).json(message);
}

const deleteById = function(req, res) {
    const productId = req.params.productId;
    const isDeleted = Product.deleteById(productId);
    if (isDeleted) {
        status = 200;
        message = {
            message: "Product has been deleted!"
        };
    } else {
        status = 404;
        message = {
            message: "Product with ID " + productId + " can not be deleted!"
        };
    }
    res.status(status).json(message);
}

module.exports = {
    getAll,
    getById,
    deleteById
}