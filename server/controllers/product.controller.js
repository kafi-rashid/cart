const Product = require("../models/product.model");
let status = 200;
let message = {};

const getAll = function(req, res) {
    const token = req.get("Authorization");
    if (token) {
        res.status(200).json(Product.getAll());
    } else {
        res.status(403).json({
            message: "Token is missing from Authorization Header"
        });
    }
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